import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import axios from 'axios';
const GOOGLE_API_KEY = 'AIzaSyCPTffhz5krgd66ihZor-TAlv-oRGca7GY';

function ImageProcess() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [insights, setInsights] = useState("");
  const [carbonEmission, setCarbonEmission] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add Pinata states
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  // Pinata credentials
  const PINATA_API_KEY = '0a99f0f3ba0b27aab91c';
  const PINATA_SECRET_KEY = 'b5ef2cdd7fe1f4d12bde1234d3b3f9489ef3036ca2d0079288bd039ea695e01f';


  // Add uploadToPinata function
  const uploadToPinata = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image first');
      return;
    }

    try {
      setUploadStatus('Uploading...');

      const formData = new FormData();
      formData.append('file', selectedFile);

      // Add metadata
      const metadata = {
        name: `electricity_bill_${Date.now()}`,
        keyvalues: {
          userId: 'user123',
          uploadDate: new Date().toISOString()
        }
      };

      formData.append('pinataMetadata', JSON.stringify(metadata));

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        maxContentLength: 'Infinity'
      };

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        config
      );

      setIpfsHash(response.data.IpfsHash);
      setUploadStatus('Bill image uploaded successfully!');

    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploadStatus('Error uploading image. Please try again.');
    }
  };

  // Existing functions remain unchanged
  const convertImageToText = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      setError(null);
      const worker = await createWorker();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const { data } = await worker.recognize(selectedImage);
      await worker.terminate();
      
      await fetchCarbonInsights(data.text);
    } catch (error) {
      console.error("Error processing image:", error);
      setInsights("Error processing image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchCarbonInsights = async (extractedText) => {
    if (!extractedText) return;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a carbon footprint expert. Analyze the following text for any details related to carbon emissions or carbon footprint based on energy consumption by checking current reading and previous reading, unit, bill period. Even if it does not contain information specific to carbon emission, say something based on readings. respond with the insights and suggestions based on the text. Give in short, 2-3 lines, about carbon footprints, even if it does not conclude about carbon, use some formula to convert energy usage to carbon footprints, DONT give the explanation of formula, just the carbon footprint value and one liner insights and some basic suggestion for future usage, total 3 lines: SHORTEN ENTIRE OUTPUT AND INCLUDE CARBON EMISSION AND SUGGESTION, JUST ANYHOW GIVE ME CARBON EMISSION VALUE NUMBER, CALCULATE AND GIVE NUMBER ANYHOW "${extractedText}"`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const insightText = data.candidates?.[0]?.content?.parts?.[0]?.text.trim();
      
      setInsights(insightText || "No relevant carbon emission insights found.");
    } catch (error) {
      console.error('Error fetching Gemini insights:', error);
      setInsights("Error fetching insights. Please try again.");
    }
  };

  const fetchCarbonEmissionValue = async () => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Extract only the carbon emission value from the following text and return just the value: "${insights}"`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const carbonEmissionValue = data.candidates?.[0]?.content?.parts?.[0]?.text.trim();
      
      setCarbonEmission(carbonEmissionValue);
    } catch (error) {
      console.error('Error fetching carbon emission value:', error);
    }
  };

  const handleSaveCarbonEmission = async () => {
    if (!carbonEmission) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Please login to save carbon emission data');
      }
  
      const response = await fetch('http://localhost:5000/api/auth/carbon-footprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ emission: carbonEmission })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(errorData.error || 'Failed to save carbon emission');
      }

      const data = await response.json();
      alert('Carbon emission saved successfully!');
      
      setSelectedImage(null);
      setInsights("");
      setCarbonEmission(null);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      convertImageToText();
    }
  }, [selectedImage]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedFile(file);  // Set for Pinata upload
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="mb-4">Upload your utility bill to calculate your carbon footprint</p>
      
      <div className="mb-6">
        <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-2">
          Upload Bill Image
        </label>
        <input 
          type="file" 
          id="upload" 
          accept="image/*" 
          onChange={handleChangeImage}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isProcessing && (
        <div className="text-center p-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-gray-600">Processing image...</p>
        </div>
      )}

      {insights && !isProcessing && (
        <div className="border rounded-lg p-4 bg-green-50">
          <h2 className="text-lg font-bold mb-2">Carbon Emission Insights</h2>
          <p className="whitespace-pre-wrap">{insights}</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={fetchCarbonEmissionValue}
          >
            Extract Carbon Emission Value
          </button>
        </div>
      )}

      {carbonEmission && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Carbon Emission Value: {carbonEmission}</p>
          <button
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleSaveCarbonEmission}
          >
            Save Carbon Emission to Profile
          </button>
        </div>
      )}

      {/* Add Pinata Upload Button and Status */}
      <button
        onClick={uploadToPinata}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedFile}
      >
        Store Bill 
      </button>

      {uploadStatus && (
        <p className={`mt-2 text-sm ${
          uploadStatus.includes('Error') ? 'text-red-600' : 'text-gray-600'
        }`}>
          {uploadStatus}
        </p>
      )}

      {ipfsHash && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-semibold text-green-600">✅ Upload Successful!</p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:text-blue-700 mt-2 block"
          >
            View Bill Image
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageProcess;
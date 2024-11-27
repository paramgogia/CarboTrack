import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../@/components/ui/dialog';
import { Button } from '../@/components/ui/button';
import { Mail, Users, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../@/components/ui/alert';
import { QRCodeSVG } from 'qrcode.react';
import emailjs from '@emailjs/browser';

const EventEmailSender = ({ event }) => {
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("hfx--3KcbLgX-EWIv");
  }, []);

  const generateQRCodeURL = async (qrCodeData) => {
    const svg = document.querySelector('#event-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    });
  };

  const sendEmail = async (emailAddress, qrCodeUrl) => {
    const templateParams = {
      to_email: emailAddress,
      event_title: event.title,
      event_description: event.description,
      event_date: event.endsDate,
      custom_message: message,
      qr_code_url: qrCodeUrl
    };

    try {
      await emailjs.send(
        'service_n1oirmq',
        'template_tts5r55',
        templateParams,
      );
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };

  const handleSendEmails = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Generate QR code data and convert to URL
      const qrCodeData = JSON.stringify({
        title: event.title,
        description: event.description,
        endsDate: event.endsDate,
        category: event.category
      });
      
      const qrCodeUrl = await generateQRCodeURL(qrCodeData);

      // Split emails and filter empty/invalid
      const emailList = emails
        .split(/[,\n]/)
        .map(email => email.trim())
        .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

      if (emailList.length === 0) {
        throw new Error('No valid email addresses provided');
      }

      // Send emails to all recipients
      let successCount = 0;
      for (const email of emailList) {
        const success = await sendEmail(email, qrCodeUrl);
        if (success) successCount++;
      }

      if (successCount > 0) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setEmails('');
        setMessage('');
      } else {
        throw new Error('Failed to send emails');
      }
    } catch (error) {
      setError(error.message || 'Failed to send emails');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 transition-all duration-300"
        >
          <Mail size={18} className="text-emerald-600" />
          <span className="text-emerald-700 font-medium">Invite via Email</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-b from-white to-emerald-50 border border-emerald-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-emerald-800 pb-2 border-b border-emerald-100">
            Send Event Invitations
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Email Addresses
              <span className="text-emerald-500 ml-1 text-xs">(separate with commas or new lines)</span>
            </label>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="john@example.com, jane@example.com"
              className="w-full h-24 px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white/50 backdrop-blur-sm placeholder-emerald-300 text-gray-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Custom Message
              <span className="text-emerald-500 ml-1 text-xs">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              className="w-full h-24 px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white/50 backdrop-blur-sm placeholder-emerald-300 text-gray-400 transition-all duration-200"
            />
          </div>
          <div className="border border-emerald-200 rounded-xl p-6 bg-white/80 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-emerald-700 mb-4">Event QR Code</h4>
            <div className="flex justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg">
              <QRCodeSVG
                id="event-qr-code"
                value={JSON.stringify({
                  title: event.title,
                  description: event.description,
                  endsDate: event.endsDate,
                  category: event.category
                })}
                size={128}
                level="H"
              />
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl py-6 font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
            onClick={handleSendEmails}
            disabled={!emails.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending Invitations...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Send Invitations</span>
              </div>
            )}
          </Button>
          {showSuccess && (
            <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200 rounded-xl shadow-sm">
              <AlertDescription className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Invitations sent successfully!</span>
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="bg-red-50 text-red-800 border-red-200 rounded-xl shadow-sm">
              <AlertDescription className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span>{error}</span>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventEmailSender;
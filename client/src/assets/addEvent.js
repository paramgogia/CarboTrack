import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../@/components/ui/card';
import { Button } from '../@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Alert, AlertDescription } from '../@/components/ui/alert';

const AddEventForm = ({ onAddEvent }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    endsDate: '',
    image: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new event object
    const newEvent = {
      id: Date.now(),
      ...formData,
      likes: 0,
      participants: 0,
      remainingTime: 'Just added'
    };
    
    onAddEvent(newEvent);
    setFormData({
      title: '',
      description: '',
      category: '',
      endsDate: '',
      image: ''
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mb-8">
      {!isFormOpen ? (
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full py-4 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add New Event
        </Button>
      ) : (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Create New Event</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFormOpen(false)}
            >
              <X size={20} />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md h-24"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endsDate"
                    value={formData.endsDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Event
                </Button>
              </div>
            </form>
            
            {showSuccess && (
              <Alert className="mt-4">
                <AlertDescription>
                  Event created successfully!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddEventForm;
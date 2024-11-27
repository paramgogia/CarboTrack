import React, { useState } from 'react';
import { Bell, Search, Menu, X, MessageSquare, Heart, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../@/components/ui/card';
import img from '../images/img5.webp';
import imgR from '../images/imgR.jpg';
import imgr1 from '../images/imgr1.jpg';
import article from '../images/article.png';
import article2 from '../images/article2.jpg';
import event from '../images/event.jpg';
import event2 from '../images/event2.jpg';
import confo from '../images/confo.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar';
import { Badge } from '../@/components/ui/badge';
import { MoreVertical, Users } from 'lucide-react';
import EventEmailSender from './EmailSender';
// Adjust this based on the library or icon type you use
import AddEventForm from './addEvent';
const CommunityPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Discussions"); // Track the selected sidebar item
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New event in your group", isRead: false },
    { id: 2, text: "Someone liked your discussion", isRead: false },
    { id: 3, text: "Register for the greatest event", isRead: true }
  ]);
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: "Thomas L.",
      title: "Do clothes also release carbon footprint?",
      likes: 23,
      comments: 0,
      timeAgo: "4 days ago",
      content: "Yes,even Clothes release carbon ..."
    },
    {
      id: 2,
      author: "Angel",
      title: "How does carbon emmission take place?",
      likes: 48,
      comments: 21,
      timeAgo: "5 days ago",
      content: "Carbon Emmision is the release of carbon dioxide..."
    },
    {
      "id": 3,
      "author": "John",
      "title": "What are the main sources of carbon emissions?",
      "likes": 65,
      "comments": 33,
      "timeAgo": "2 days ago",
      "content": "The primary sources of carbon emissions include burning fossil fuels for energy, deforestation, and industrial processes such as cement production and chemical manufacturing."
    },
    {
      "id": 4,
      "author": "Mike",
      "title": "What role do forests play in reducing carbon emissions?",
      "likes": 72,
      "comments": 25,
      "timeAgo": "4 days ago",
      "content": "Forests act as carbon sinks, absorbing carbon dioxide from the atmosphere. Protecting and planting trees is one of the most effective ways to reduce carbon emissions."
    },
    {
      "id": 5,
      "author": "Emily",
      "title": "How does the transportation sector contribute to carbon emissions?",
      "likes": 80,
      "comments": 40,
      "timeAgo": "3 days ago",
      "content": "The transportation sector contributes significantly to carbon emissions due to the reliance on gasoline and diesel fuels for cars, trucks, airplanes, and ships."
    }
  ]);
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Understanding Carbon Emissions",
      content:
        "An in-depth article on carbon emissions, including how it affects the planet, what industries contribute the most, and what individuals can do to reduce their impact.",
      image: article,
      link: "https://greenly.earth/en-us/blog/ecology-news/carbon-emissions-what-you-need-to-know"
    },
    {
      id: 2,
      title: "Reducing Your Carbon Footprint",
      content:
        "Practical tips for lowering your carbon footprint, from reducing energy consumption to choosing sustainable transportation options and adopting a more eco-friendly lifestyle.",
      image: article2,
      link: "https://youth.europa.eu/get-involved/sustainable-development/how-reduce-my-carbon-footprint_en"
    },
    {
      id: 3,
      title: "The Impact of Sustainable Energy Solutions",
      content:
        "Explore the various sustainable energy solutions available, their environmental benefits, and how they can be integrated into urban planning to create greener cities.",
      image: article,
      link: "https://www.sciencedirect.com/science/article/pii/S2772427122000687"
    },
    {
      id: 4,
      title: "The Role of Technology in Climate Change Mitigation",
      content:
        "An exploration of the role technology plays in combating climate change, from renewable energy innovations to artificial intelligence in environmental monitoring and predictions.",
      image: article2,
      link: "https://www.aeologic.com/blog/role-of-technology-in-climate-change/#:~:text=It%20can%20help%20us%20to,and%20products%20more%20energy%2Defficient."
    }
  ]);
  const [activeTab, setActiveTab] = useState('active');
  
  const activeEvents = [
    {
      id: 1,
      title: "Carbon Footprint Challenge",
      description: "Track and reduce your carbon footprint over 30 days. Win prizes for the biggest reductions!",
      image:event2 ,
      endsDate: "December 1st",
      remainingTime: "2 weeks to go",
      likes: 534,
      participants: 892,
      category: "challenge"
    },
    {
      id: 2,
      title: "Green Innovation Summit",
      description: "Join industry leaders and innovators to showcase sustainable technologies and solutions.",
      image:confo,
      endsDate: "January 15th",
      remainingTime: "1 month to go",
      likes: 423,
      participants: 1240,
      category: "conference"
    },
    {
      id: 3,
      title: "Zero Emission Transport Week",
      description: "Participate in our city-wide initiative to use only zero-emission transportation methods.",
      image: event,
      endsDate: "November 30th",
      remainingTime: "3 days to go",
      likes: 892,
      participants: 2156,
      category: "challenge"
    }
  ];

  const completedEvents = [
    {
      id: 4,
      title: "Global Climate Hackathon",
      description: "48-hour virtual event where teams developed innovative solutions for carbon tracking.",
      image: event2,
      completedDate: "October 15th",
      likes: 756,
      participants: 1432,
      category: "competition"
    },
    {
      id: 5,
      title: "Renewable Energy Fair",
      description: "Exhibition of latest renewable energy technologies and their impact on carbon reduction.",
      image: confo,
      completedDate: "September 30th",
      likes: 645,
      participants: 3200,
      category: "exhibition"
    }
  ];

  const [wishlist, setWishlist] = useState([
    { id: 1, event: "Green Tech Conference", date: "2024-12-01" },
    { id: 2, event: "Carbon Neutral Day", date: "2024-11-20" }
    // Add more wishlist items here...
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const sidebarItems = [
    { icon: "💭", label: "Discussions", value: "Discussions" },
    { icon: "📝", label: "Articles", value: "Articles" },
    { icon: "📅", label: "Events", value: "Events" },
    { icon: "⭐", label: "Wishlist", value: "Wishlist" },
    { icon: "❓", label: "Help center", value: "Help center" }
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', author: 'User C' });
  const [events, setEvents] = useState([...activeEvents]); // assuming activeEvents is your initial data

  const handleAddEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };
  const handleLike = (discussionId) => {
    setDiscussions(discussions.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, likes: discussion.likes + 1 }
        : discussion
    ));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handlePostDiscussion = () => {
    const newId = discussions.length + 1;
    setDiscussions([
      ...discussions,
      { ...newDiscussion, id: newId, timeAgo: "Just now", likes: 0, comments: 0 }
    ]);
    setNewDiscussion({ title: '', content: '', author: 'User C' }); // Reset form
  };

  const renderContent = () => {
    switch (activeSidebarItem) {
      case "Discussions":
        // Filter discussions based on search query
        const filteredDiscussions = discussions.filter(discussion =>
          discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div>
            {/* Add New Discussion */}
            <div className="mb-6 border-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <input
                type="text"
                placeholder="Share your thoughts on sustainability..."
                value={newDiscussion.title}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                className="w-full p-3 mb-4 border border-green-200 rounded-lg bg-white/90  focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              />
              <textarea
                placeholder="Write your discussion about environmental impact..."
                value={newDiscussion.content}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                className="w-full p-4 mb-4 border border-green-200 rounded-lg bg-white/90  min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              />
              <button
                onClick={handlePostDiscussion}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Share with Community</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
        
            {/* Render Filtered Discussions */}
            {filteredDiscussions.map(discussion => (
              <Card key={discussion.id} className="w-full mb-6 bg-white/90 hover:bg-white transition-all duration-300 border-0 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="border-b border-green-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-green-200">
                        <img
                          src={imgR}
                          alt={discussion.author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-green-800">{discussion.author}</div>
                        <div className="text-sm text-green-600/70">{discussion.timeAgo}</div>
                      </div>
                    </div>
                    <button className="text-green-600/70 hover:text-green-800 transition-colors duration-300">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold mt-4 text-green-900">{discussion.title}</h2>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-green-800/80 leading-relaxed">{discussion.content}</p>
                  <div className="flex items-center space-x-6 mt-6">
                    <button 
                      className="flex items-center space-x-2 text-green-600/70 hover:text-green-800 transition-colors duration-300"
                      onClick={() => handleLike(discussion.id)}
                    >
                      <Heart size={20} className={discussion.isLiked ? "fill-current" : ""} />
                      <span>{discussion.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-green-600/70 hover:text-green-800 transition-colors duration-300">
                      <MessageSquare size={20} />
                      <span>{discussion.comments}</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Environmental
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
                  case "Articles":
                    return (
                      <div className="pt-16 flex gap-4">
                        <main className="flex-1 px-4 lg:px-8 py-6 border border-2 rounded-xl bg-slate-300">
                          <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {articles.map((article) => (
                                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                  />
                                  <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800">{article.title}</h3>
                                    <p className="mt-2 text-gray-600 line-clamp-3">{article.content}</p>
                                    <a
                                      href={article.link}
                                      className="text-blue-600 font-medium mt-4 inline-block hover:underline"
                                    >
                                      Read the full article
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </main>
                      </div>
                    );
                  
                  
      case "Events":
        return (
          <div className="max-w-4xl mx-auto p-6">
            {/* Tabs */}
            <div className="flex space-x-8 mb-8">
              <button
          className={`text-xl font-semibold relative ${
            activeTab === 'active' ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('active')}
              >
          Active and Upcoming
          {activeTab === 'active' && (
            <span className="absolute -top-2 -right-4 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeEvents.length}
            </span>
          )}
              </button>
              <button
          className={`text-xl font-semibold relative ${
            activeTab === 'completed' ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('completed')}
              >
          Completed
          {activeTab === 'completed' && (
            <span className="absolute -top-2 -right-4 bg-gray-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {completedEvents.length}
            </span>
          )}
              </button>
              <button
          className={`text-xl font-semibold relative ${
            activeTab === 'addevent' ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('addevent')}
              >
          Add Event
          
              </button>
            </div>
            
            {/* Events List */}
            <div className="space-y-6">
              {activeTab === 'active' ? (
          <>
            {activeEvents.map(event => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex md:flex-row flex-col">
            <div className="md:w-1/3">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500">
              Ends {event.endsDate}
              <span className="ml-4">{event.remainingTime}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <Heart className="text-gray-400" size={18} />
                  <span className="text-gray-600">{event.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-gray-400" size={18} />
                  <span className="text-gray-600">{event.participants}</span>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {event.category}
                </span>
                <EventEmailSender event={event} />
              </div>
            </div>
                </div>
              </Card>
            ))}
          </>
              ) : activeTab === 'completed' ? (
          <>
            {completedEvents.map(event => (
              <Card key={event.id} className="overflow-hidden opacity-75">
                <div className="flex md:flex-row flex-col">
            <div className="md:w-1/3">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500">
              Completed on {event.completedDate}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <Heart className="text-gray-400" size={18} />
                  <span className="text-gray-600">{event.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-gray-400" size={18} />
                  <span className="text-gray-600">{event.participants}</span>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {event.category}
                </span>
              </div>
            </div>
                </div>
              </Card>
            ))}
          </>
              ) : (
          <AddEventForm onAddEvent={handleAddEvent} />
              )}
            </div>
          </div>
        );
      
      case "Wishlist":
        return wishlist.map(item => (
          <div key={item.id} className="border-b py-4">
            <h3 className="text-xl font-semibold">{item.event}</h3>
            <p>{item.date}</p>
          </div>
        ));
      
        case "Feed":
          return <div>Feed section content goes here.</div>;
  
          case "Help center":
            return (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Help Center</h2>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">How do I reduce my carbon footprint?</h3>
                    <p className="text-gray-600">
                      To reduce your carbon footprint, consider switching to renewable energy sources, using public transport, recycling, and minimizing your consumption of single-use plastics. Every small change helps!
                    </p>
                  </div>
          
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">How can I participate in challenges?</h3>
                    <p className="text-gray-600">
                      Join a challenge by visiting the "Challenges" section from the sidebar. There, you can sign up for various sustainability challenges and track your progress. You'll be rewarded for completing challenges!
                    </p>
                  </div>
          
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">How do I interact with other members?</h3>
                    <p className="text-gray-600">
                      You can join discussions, comment on posts, or send direct messages to other members through the platform. Engage in discussions to share tips and learn from others in the community!
                    </p>
                  </div>
          
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">How do I update my profile?</h3>
                    <p className="text-gray-600">
                      To update your profile, click on your profile picture in the top-right corner. From there, you can update your personal details, avatar, and bio.
                    </p>
                  </div>
                </div>
              </div>
            );
          
      default:
        return <div>Select an item from the sidebar to view content.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 rounded-3xl">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm  w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X /> : <Menu />}
              </button>
              <div className="text-xl font-bold">Community Meetup</div>
            </div>

            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for topics and discussions"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                >
                  <Bell />
                  {notifications.some(n => !n.isRead) && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </button>

                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Notifications</h3>
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-2 hover:bg-gray-50 rounded ${!notification.isRead ? 'bg-blue-50' : ''}`}
                        >
                          {notification.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
{/* 
              <img
                src={img}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />*/}
            </div> 
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-2 flex gap-4">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static w-64 h-screen bg-slate-100 rounded-lg  shadow-lg transform transition-transform duration-200 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSidebarItem(item.value)} // Update active item
                className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${activeSidebarItem === item.value ? 'bg-gray-200' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 lg:px-8 py-6 border border-2 rounded-xl bg-slate-300">
          <div className="max-w-3xl mx-auto space-y-2">
            {renderContent()}
          </div>
        </main>

         {/* Right Sidebar - Leaderboard */}
         <aside className="hidden xl:block w-64 p-4 bg-slate-100 rounded-lg">
         {/* <Card>
            <CardContent className="pt-6 text-center">
            
            
              <Avatar className="w-22 h-22 mx-auto">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  <img src={img} className="w-12 h-12 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="mt-2 space-y-2">
                  <h2 className="text-xl font-bold">John Doe</h2>
                <Badge variant="secondary">Level 15 Eco Warrior</Badge>
              </div>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Leaderboard</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3,4,5,6,7,8].map((position) => (
                  <div key={position} className="flex items-center space-x-3">
                    <span className="font-bold text-gray-500">{position}</span>
                    <img
                      src={imgr1}
                      alt={`Top ${position}`}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium">User {position}</div>
                      <div className="text-sm text-gray-500">{500 - position * 50} points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      
    </div>
  );
};

export default CommunityPage;

// import React, { useState } from 'react';
// import { Bell, Search, Trophy, Calendar, Book, Users, MessageSquare } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "../@/components/ui/card";
// import { Input } from "../@/components/ui/input";
// import { Button } from "../@/components/ui/button";
// import { Alert, AlertDescription } from "../@/components/ui/alert";
// import { Avatar } from "../@/components/ui/avatar";
// import { Badge } from "../@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../@/components/ui/tabs";

// const Community = () => {
//   const [activeTab, setActiveTab] = useState('feed');

//   // Sample data - in real app, this would come from your backend
//   const posts = [
//     {
//       id: 1,
//       author: "Emma Green",
//       avatar: "/api/placeholder/32/32",
//       content: "Just switched to solar panels! Reduced my carbon footprint by 40%! 🌞",
//       likes: 124,
//       comments: 18,
//       timestamp: "2h ago"
//     },
//     {
//       id: 2,
//       author: "Mike Rivers",
//       avatar: "/api/placeholder/32/32",
//       content: "Looking for participants in our local beach cleanup this weekend! Join us! 🏖️",
//       likes: 89,
//       comments: 32,
//       timestamp: "4h ago"
//     }
//   ];

//   const challenges = [
//     {
//       id: 1,
//       title: "Zero Waste Week",
//       participants: 1234,
//       deadline: "5 days left",
//       prize: "500 Green Points"
//     },
//     {
//       id: 2,
//       title: "Bike to Work Month",
//       participants: 892,
//       deadline: "2 weeks left",
//       prize: "1000 Green Points"
//     }
//   ];

//   const leaderboard = [
//     { rank: 1, name: "Sarah Chen", points: 15420, avatar: "/api/placeholder/32/32" },
//     { rank: 2, name: "John Smith", points: 14250, avatar: "/api/placeholder/32/32" },
//     { rank: 3, name: "Maria Garcia", points: 13890, avatar: "/api/placeholder/32/32" }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Community</h1>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input 
//               className="pl-10 w-64" 
//               placeholder="Search community..." 
//             />
//           </div>
//           <Button variant="outline" className="gap-2">
//             <Bell className="h-4 w-4" />
//             <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-12 gap-6">
//         {/* Left Sidebar */}
//         <div className="col-span-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Navigation</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <nav className="space-y-2">
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <MessageSquare className="h-4 w-4" /> Feed
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <Trophy className="h-4 w-4" /> Challenges
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <Calendar className="h-4 w-4" /> Events
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <Book className="h-4 w-4" /> Knowledge Base
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <Users className="h-4 w-4" /> Groups
//                 </Button>
//               </nav>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Area */}
//         <div className="col-span-6">
//           <Tabs defaultValue="feed" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="feed">Community Feed</TabsTrigger>
//               <TabsTrigger value="challenges">Challenges</TabsTrigger>
//               <TabsTrigger value="events">Events</TabsTrigger>
//             </TabsList>

//             <TabsContent value="feed" className="space-y-4 mt-4">
//               <Button className="w-full">Share Your Progress</Button>
              
//               {posts.map(post => (
//                 <Card key={post.id} className="mb-4">
//                   <CardContent className="pt-4">
//                     <div className="flex items-start gap-3">
//                       <Avatar>
//                         <img src={post.avatar} alt={post.author} />
//                       </Avatar>
//                       <div className="flex-1">
//                         <div className="flex justify-between">
//                           <h3 className="font-semibold">{post.author}</h3>
//                           <span className="text-sm text-gray-500">{post.timestamp}</span>
//                         </div>
//                         <p className="mt-2">{post.content}</p>
//                         <div className="flex gap-4 mt-4">
//                           <Button variant="ghost" size="sm">
//                             ❤️ {post.likes}
//                           </Button>
//                           <Button variant="ghost" size="sm">
//                             💬 {post.comments}
//                           </Button>
//                           <Button variant="ghost" size="sm">
//                             Share
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </TabsContent>

//             <TabsContent value="challenges">
//               {challenges.map(challenge => (
//                 <Card key={challenge.id} className="mb-4">
//                   <CardContent className="pt-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h3 className="font-semibold text-lg">{challenge.title}</h3>
//                         <p className="text-sm text-gray-500">
//                           {challenge.participants} participants • {challenge.deadline}
//                         </p>
//                       </div>
//                       <Button>Join Challenge</Button>
//                     </div>
//                     <div className="mt-3">
//                       <Badge variant="secondary">Prize: {challenge.prize}</Badge>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-span-3">
//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle>Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {leaderboard.map((user) => (
//                 <div key={user.rank} className="flex items-center gap-3 mb-4">
//                   <span className="font-bold w-6">{user.rank}</span>
//                   <Avatar>
//                     <img src={user.avatar} alt={user.name} />
//                   </Avatar>
//                   <div className="flex-1">
//                     <p className="font-medium">{user.name}</p>
//                     <p className="text-sm text-gray-500">{user.points} points</p>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Upcoming Events</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Alert className="mb-4">
//                 <Calendar className="h-4 w-4" />
//                 <AlertDescription>
//                   Tree Planting Drive
//                   <br />
//                   <span className="text-sm text-gray-500">This Saturday, 10 AM</span>
//                 </AlertDescription>
//               </Alert>
//               <Alert>
//                 <Calendar className="h-4 w-4" />
//                 <AlertDescription>
//                   Sustainability Workshop
//                   <br />
//                   <span className="text-sm text-gray-500">Next Tuesday, 6 PM</span>
//                 </AlertDescription>
//               </Alert>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Community;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';

const NewsCard = ({ data, theme }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const cardStyle = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const descriptionStyle = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg w-full ${cardStyle}`}>
      {data.urlToImage && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={data.urlToImage}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="space-y-0.5 p-2">
        <CardTitle className="text-sm font-semibold line-clamp-2">
          {data.title}
        </CardTitle>
        <p className="text-xs opacity-75">
          {formatDate(data.publishedAt)}
          {data.source.name && ` • ${data.source.name}`}
        </p>
      </CardHeader>

      <CardContent className="p-2 pt-0">
        <p className={`text-xs line-clamp-2 ${descriptionStyle}`}>
          {data.description}
        </p>
        
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1.5 text-xs text-red-500 hover:text-red-600 transition-colors"
        >
          Read more →
        </a>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
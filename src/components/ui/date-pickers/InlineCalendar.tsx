import React, { useState } from 'react';

interface InlineCalendarProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const InlineCalendar: React.FC<InlineCalendarProps> = ({
  value = '',
  onChange,
  className = '',
}) => {
  const [currentDate, setCurrentDate] = useState(
    value ? new Date(value) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState(value);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const selectDate = (date: Date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    onChange?.(formattedDate);
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return formatDate(date) === selectedDate;
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className={`w-full max-w-sm bg-white border rounded-lg shadow-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold">{monthYear}</h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => date && selectDate(date)}
            disabled={!date}
            className={`p-2 text-sm rounded hover:bg-blue-100 focus:outline-none focus:bg-blue-100 ${
              !date 
                ? 'invisible' 
                : isSelected(date)
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'text-gray-700'
            }`}
            aria-label={date ? formatDate(date) : undefined}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}; 
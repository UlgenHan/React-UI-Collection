import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicDatePicker,
  IconDatePicker,
  DateTimePicker,
  InlineCalendar,
  RangeDatePicker,
  DropdownDatePicker,
  DarkModeDatePicker,
  FloatingLabelDatePicker,
  MobileFriendlyDatePicker,
  DisabledDatePicker
} from '../components/ui/date-pickers';

const DatePickerGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateChange = (component: string, value: string) => {
    setSelectedDates(prev => ({ ...prev, [component]: value }));
  };

  const components = [
    {
      name: 'Basic Date Picker',
      component: (
        <BasicDatePicker
          label="Select Date"
          value={selectedDates.basic || ''}
          onChange={(value) => handleDateChange('basic', value)}
          required
        />
      ),
      description: 'Simple date input using native browser date picker'
    },
    {
      name: 'Icon Date Picker',
      component: (
        <IconDatePicker
          label="Date with Icon"
          value={selectedDates.icon || ''}
          onChange={(value) => handleDateChange('icon', value)}
          iconPosition="left"
        />
      ),
      description: 'Date picker with calendar icon inside the input field'
    },
    {
      name: 'Date Time Picker',
      component: (
        <DateTimePicker
          label="Date & Time"
          value={selectedDates.datetime || ''}
          onChange={(value) => handleDateChange('datetime', value)}
          showSeconds
        />
      ),
      description: 'Combined date and time selection with optional seconds'
    },
    {
      name: 'Inline Calendar',
      component: (
        <InlineCalendar
          value={selectedDates.inline || ''}
          onChange={(value) => handleDateChange('inline', value)}
        />
      ),
      description: 'Always visible calendar with month navigation'
    },
    {
      name: 'Range Date Picker',
      component: (
        <RangeDatePicker
          label="Date Range"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      ),
      description: 'Select start and end dates with validation'
    },
    {
      name: 'Dropdown Date Picker',
      component: (
        <DropdownDatePicker
          label="Dropdown Calendar"
          value={selectedDates.dropdown || ''}
          onChange={(value) => handleDateChange('dropdown', value)}
          placeholder="Click to open calendar"
        />
      ),
      description: 'Calendar opens in dropdown overlay on click'
    },
    {
      name: 'Dark Mode Date Picker',
      component: (
        <div className="bg-gray-800 p-4 rounded-lg">
          <DarkModeDatePicker
            label="Dark Theme Date"
            value={selectedDates.dark || ''}
            onChange={(value) => handleDateChange('dark', value)}
          />
        </div>
      ),
      description: 'Date picker designed for dark theme environments'
    },
    {
      name: 'Floating Label Date Picker',
      component: (
        <FloatingLabelDatePicker
          label="Floating Label"
          value={selectedDates.floating || ''}
          onChange={(value) => handleDateChange('floating', value)}
        />
      ),
      description: 'Label floats above input when focused or has value'
    },
    {
      name: 'Mobile Friendly Date Picker',
      component: (
        <MobileFriendlyDatePicker
          label="Mobile Optimized"
          value={selectedDates.mobile || ''}
          onChange={(value) => handleDateChange('mobile', value)}
        />
      ),
      description: 'Touch-optimized with larger buttons and mobile-first design'
    },
    {
      name: 'Disabled Date Picker',
      component: (
        <DisabledDatePicker
          label="Disabled Date"
          value="2024-01-15"
          helperText="Date selection is locked for this record"
        />
      ),
      description: 'Non-editable date picker with disabled styling'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Gallery
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Date Picker Components</h1>
          <p className="text-xl text-gray-600">
            Date and time selection components with various styles and functionality
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {components.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              
              <div className="space-y-4">
                {item.component}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Usage Notes</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• All components use native HTML5 date inputs for better browser compatibility</li>
            <li>• Components support TypeScript with proper prop validation</li>
            <li>• Accessibility features include ARIA labels and keyboard navigation</li>
            <li>• Mobile-friendly components include touch-optimized interactions</li>
            <li>• Range picker validates start/end date relationships automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatePickerGallery; 
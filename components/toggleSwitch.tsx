
import React, { useState } from 'react';

interface ToggleSwitchProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <button className={`relative inline-block w-12 h-6 ${isChecked ? 'bg-red-100' : 'bg-gray-200'} rounded-full cursor-pointer`}
      onClick={handleToggle}
    >
      <span
        className={`absolute left-0 top-0 bottom-0 m-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          isChecked ? 'translate-x-6' : ''
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;

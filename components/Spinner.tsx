
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary-600"></div>
    </div>
  );
};

export default Spinner;

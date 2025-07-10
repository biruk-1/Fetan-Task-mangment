import React from 'react';

interface EmptyStateProps {
  onAddNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNew }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] bg-white">
      <h2 className="text-2xl font-semibold mb-4">No Tasks Yet</h2>
      <p className="text-gray-600 mb-6 text-center">
        No tasks created yet. You can start by clicking<br />
        the Add New button below to create one.
      </p>
      <button
        onClick={onAddNew}
        className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center"
      >
        <span className="mr-2">+</span>
        Add New
      </button>
    </div>
  );
};

export default EmptyState; 
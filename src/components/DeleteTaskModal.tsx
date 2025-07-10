import React, { useState } from 'react';

interface DeleteTaskModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ onClose, onDelete }) => {
  const [confirmText, setConfirmText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText.toLowerCase() === 'delete') {
      onDelete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-[400px] max-w-[90%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-6">Delete Task</h2>
        <p className="text-gray-600 mb-6">
          This action can't be undone. Enter the word "delete" in the given field below to delete task
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type delete to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:border-pink-500"
            autoFocus
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
              disabled={confirmText.toLowerCase() !== 'delete'}
            >
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteTaskModal; 
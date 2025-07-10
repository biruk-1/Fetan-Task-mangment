import React, { useState } from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: 'pending' | 'completed' | 'in_progress') => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onStatusChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-pink-100 text-pink-800';
    }
  };

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-4">
      {currentTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <span className="text-gray-800 font-medium">{task.title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as any)}
                className={`${getStatusColor(task.status)} px-4 py-1 rounded-full text-sm font-medium appearance-none cursor-pointer min-w-[120px] text-center`}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-pink-500 transition-colors p-1"
              aria-label="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing {indexOfFirstTask + 1} to {Math.min(indexOfLastTask, tasks.length)} of {tasks.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-2 py-1 text-pink-500 disabled:text-gray-300"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 ${
                currentPage === page
                  ? 'bg-pink-500 text-white rounded'
                  : 'text-pink-500'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-pink-500 disabled:text-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList; 
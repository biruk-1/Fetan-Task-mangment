import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/task';
import EmptyState from './EmptyState';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import Header from './Header';
import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../features/tasks/tasksApi';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: tasks = [], isLoading, error, refetch } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    console.log('Tasks data:', tasks);
    console.log('Loading:', isLoading);
    console.log('Error:', error);
  }, [tasks, isLoading, error]);

  const handleAddTask = async (title: string) => {
    try {
      await addTask({ title }).unwrap();
      setShowAddModal(false);
      refetch(); // Refetch tasks after adding
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTaskId) {
      try {
        await deleteTask(selectedTaskId).unwrap();
        setSelectedTaskId(null);
        setShowDeleteModal(false);
        refetch(); // Refetch tasks after deleting
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleStatusChange = async (taskId: string, status: 'pending' | 'completed' | 'in_progress') => {
    try {
      await updateTask({ id: taskId, status }).unwrap();
      refetch(); // Refetch tasks after updating
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center"
          >
            <span className="mr-2">+</span>
            Add New
          </button>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              filter === 'pending' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'completed' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Completed
          </button>
        </div>

        {tasks.length === 0 ? (
          <EmptyState onAddNew={() => setShowAddModal(true)} />
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                You've got {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} today
              </p>
            </div>
            <TaskList
              tasks={filteredTasks}
              onDelete={(taskId) => {
                setSelectedTaskId(taskId);
                setShowDeleteModal(true);
              }}
              onStatusChange={handleStatusChange}
            />
          </>
        )}

        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddTask}
          />
        )}

        {showDeleteModal && (
          <DeleteTaskModal
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedTaskId(null);
            }}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
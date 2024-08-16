import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Kanban = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
          Kanban Board
        </h1>
        <Button
          onClick={()=>navigate("/kanban/437yhhwhfhw7yrhhrq88")}
          type="primary"
          size="large"
          className="rounded-full px-8 py-4 text-lg font-semibold bg-blue-500 dark:bg-blue-600 border-none shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
        >
          + New Kanban Board
        </Button>
      </div>
    </div>
  );
};

export default Kanban;

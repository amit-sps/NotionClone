import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnAuthorized = () => {
  const navigate = useNavigate();
  console.log("UnAuthorizedUnAuthorizedUnAuthorized")

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg mb-8">You are not authorized to view this page.</p>
        <Button type="primary" onClick={handleLoginRedirect}>
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default UnAuthorized;

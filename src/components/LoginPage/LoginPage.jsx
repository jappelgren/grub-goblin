import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import PhotoGallery from '../PhotoGallery/PhotoGallery';

function LoginPage() {
  return (
    <div className="login-container">
      <PhotoGallery />
      <LoginForm />
    </div>
  );
}

export default LoginPage;

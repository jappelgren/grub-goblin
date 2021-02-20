import React from 'react';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  return (
    <div className="login-container">
      <PhotoGallery />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;

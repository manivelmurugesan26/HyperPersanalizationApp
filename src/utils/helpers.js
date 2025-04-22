import { toast } from 'react-toastify';
import { TOAST_CONFIG, MOBILE_BREAKPOINT } from './constants';

export const showToast = (message, type = 'error') => {
  toast[type](message, {
    ...TOAST_CONFIG,
    position: window.innerWidth <= MOBILE_BREAKPOINT ? "bottom-center" : "top-right",
    autoClose: type === 'success' ? 2000 : 3000,
  });
};

export const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Operation failed');
  }
  return response.json();
};

export const saveUserData = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
}; 
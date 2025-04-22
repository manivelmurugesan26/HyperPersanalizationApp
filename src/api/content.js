import { API_URL } from '../utils/constants';

export const fetchExploreContent = async () => {
  try {
    const response = await fetch(`${API_URL}/content/explore`);
    if (!response.ok) {
      throw new Error('Failed to fetch explore content');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchHomeContent = async () => {
  try {
    const response = await fetch(`${API_URL}/content/home`);
    if (!response.ok) {
      throw new Error('Failed to fetch home content');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchContentDetails = async (contentId) => {
  try {
    const response = await fetch(`${API_URL}/content/${contentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch content details');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchVideoContent = async (videoId) => {
  try {
    const response = await fetch(`${API_URL}/content/video/${videoId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch video content');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}; 
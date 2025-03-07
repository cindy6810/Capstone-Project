import { API_URL } from '../config/apiConfig';
import { Platform } from 'react-native';
import { auth } from '../Utility/firebaseConfig';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return {};
  
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const songService = {
    uploadSong: async (formData) => {
      const headers = await getAuthHeaders();
        try {
          if (!formData || !formData._parts || formData._parts.length === 0) {
            throw new Error('Invalid form data');
          }

          console.log('Uploading to:', `${API_URL}/songs/upload`);
          
          formData._parts.forEach(part => {
            console.log('Form part:', {
              name: part[0],
              type: typeof part[1],
              value: part[1]?.uri || part[1]
            });
          });
    
          const response = await fetch(`${API_URL}/songs/upload`, {
            method: 'POST',
            body: formData,
            headers
           
          });
    
          const responseText = await response.text();
          console.log('Upload response:', {
            status: response.status,
            statusText: response.statusText,
            body: responseText
          });
    
          if (!response.ok) {
            throw new Error(`Upload failed: ${responseText}`);
          }
    
          return JSON.parse(responseText);
        } catch (error) {
          console.error('Upload error details:', {
            message: error.message,
            platform: Platform.OS,
            apiUrl: API_URL,
            stack: error.stack
          });
          throw error;
        }
      },
  

  getAllSongs: async () => {
    try {
      const response = await fetch(`${API_URL}/songs`);
      if (!response.ok) throw new Error('Failed to fetch songs');
      return await response.json();
    } catch (error) {
      console.error('Fetch songs error:', error);
      throw error;
    }
  },

  getSongById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/songs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch song');
      return await response.json();
    } catch (error) {
      console.error('Fetch song error:', error);
      throw error;
    }
  },

  getMyUploads: async () => {
    try {
      const headers = await getAuthHeaders();
      
      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }
      
      const response = await fetch(`${API_URL}/songs/myUploads`, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch uploads: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch my uploads error:', error);
      throw error;
    }
  }
};

  
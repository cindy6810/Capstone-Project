import { API_URL } from '../config/apiConfig';
import { Platform } from 'react-native';

export const songService = {
    uploadSong: async (formData) => {
        try {
          // Validate FormData before sending
          if (!formData || !formData._parts || formData._parts.length === 0) {
            throw new Error('Invalid form data');
          }

          console.log('Uploading to:', `${API_URL}/songs/upload`);
          
          // Log the form data for debugging
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
            headers: {
              'Accept': 'application/json',
            },
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
  }
};
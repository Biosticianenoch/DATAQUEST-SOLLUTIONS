import { API_BASE_URL } from '@/lib/api';

export interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  speaker: string;
  attendees?: number;
  videoUrl?: string;
  isUpcoming: boolean;
}

/**
 * Fetches all webinars from the API
 */
export const fetchWebinars = async (): Promise<Webinar[]> => {
  const response = await fetch(`${API_BASE_URL}/webinars`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch webinars');
  }
  
  return response.json();
};

/**
 * Fetches a specific webinar by ID
 */
export const fetchWebinarById = async (id: string): Promise<Webinar> => {
  const response = await fetch(`${API_BASE_URL}/webinars/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch webinar');
  }
  
  return response.json();
};

/**
 * Registers a user for a webinar
 */
export const registerForWebinar = async (webinarId: string, userData: { email: string, name: string }): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/webinars/${webinarId}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to register for webinar');
  }
  
  return response.json();
}; 
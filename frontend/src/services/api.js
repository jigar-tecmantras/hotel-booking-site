const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const sendRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body?.message || response.statusText;
    throw new Error(message || 'Unable to complete the request.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchRooms = () => sendRequest('/api/rooms');
export const fetchRoomDetails = (id) => sendRequest(`/api/rooms/${id}`);
export const checkAvailability = (payload) => sendRequest('/api/availability', { method: 'POST', body: JSON.stringify(payload) });
export const bookRoom = (payload) => sendRequest('/api/bookings', { method: 'POST', body: JSON.stringify(payload) });

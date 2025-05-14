const BASE_URL = import.meta.env.VITE_API_ANNOUNCEMENTS;

export const getAllAnnouncements = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching announcements:', err);
    throw err;
  }
};

export const getAnnouncements = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/?page=${page}&limit=${limit}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching announcements:', err);
    throw err;
  }
};

export const getAnnouncement = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error getting announcement:', err);
    throw err;
  }
};

export const addAnnouncement = async (token, title, header, content, color) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ title, header, content, color, visible: true }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error adding announcement:', err);
    throw err;
  }
};

export const editAnnouncement = async (token, id, title, header, content, color, visible) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ title, header, content, color, visible }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error editing announcement:', err);
    throw err;
  }
};

export const deleteAnnouncement = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }
  } catch (err) {
    console.error('Error deleting announcement:', err);
    throw err;
  }
};

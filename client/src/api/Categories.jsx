const BASE_URL = import.meta.env.VITE_API_CATEGORIES;

export const getAllCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw err;
    }
  };

  export const getCategories = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`${BASE_URL}/?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw err;
    }
  };
  
  export const addCategory = async (token, name) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error adding category:', err);
      throw err;
    }
  };
  
  export const editCategory = async (token, id, name) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error editing category:', err);
      throw err;
    }
  };
  
  export const deleteCategory = async (token, id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { 
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
       },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      throw err;
    }
  };
  
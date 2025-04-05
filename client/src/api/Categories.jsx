const BASE_URL = 'http://localhost:3000/api/categories';

export const fetchCategories = async () => {
    try {
      const response = await fetch(BASE_URL);
      
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw err;
    }
  };
  
  export const addCategory = async (name) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error adding category:', err);
      throw err;
    }
  };
  
  export const editCategory = async (id, name) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error editing category:', err);
      throw err;
    }
  };
  
  export const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      throw err;
    }
  };
  
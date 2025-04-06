const BASE_URL = 'http://localhost:3000/api/products';

export const fetchProducts = async () => {
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  };
  
  export const getProduct = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error getting product:', err);
      throw err;
    }
  };

  export const addProduct = async (product) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: product,
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };
  
  export const editProduct = async (id, formData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error editing product:', err);
      throw err;
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE' 
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };
  
  export const fetchFilteredProducts = async (filters) => {
    try {
      const { category, minPrice, maxPrice } = filters;
      const queryParams = new URLSearchParams();
  
      if (category) queryParams.append('categories', category);
      if (minPrice) queryParams.append('min', minPrice);
      if (maxPrice) queryParams.append('max', maxPrice);
  
      const response = await fetch(`${BASE_URL}/filter?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      throw err;
    }
  };
  
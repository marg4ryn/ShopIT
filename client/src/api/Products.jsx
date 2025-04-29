const BASE_URL = 'http://localhost:3000/api/products';

  export const getAllFilteredProducts = async (filters) => {
    try {
      const { category, minPrice, maxPrice, sortOption, search } = filters;
      const queryParams = new URLSearchParams();

      if (minPrice !== undefined) queryParams.append('min', minPrice);
      if (maxPrice !== undefined) queryParams.append('max', maxPrice);

      if (category && category.length > 0) {
        queryParams.append('categories', category);
      }

      if (sortOption === 'Descending price') {
        queryParams.append('sort', 'desc');
      } else if (sortOption === 'Rising price') {
        queryParams.append('sort', 'asc');
      }

      if (search && search.trim() !== '') {
        queryParams.append('search', search.trim());
      }

      const response = await fetch(`${BASE_URL}/filter-all?${queryParams.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      throw err;
    }
  };

  export const getFilteredProducts = async (filters) => {
    try {
      const { category, minPrice, maxPrice, sortOption, search, page = 1, limit = 10 } = filters;
      const queryParams = new URLSearchParams();
  
      if (minPrice !== undefined) queryParams.append('min', minPrice);
      if (maxPrice !== undefined) queryParams.append('max', maxPrice);
  
      if (category && category.length > 0) {
        queryParams.append('categories', category);
      }
  
      if (sortOption === 'Descending price') {
        queryParams.append('sort', 'desc');
      } else if (sortOption === 'Rising price') {
        queryParams.append('sort', 'asc');
      }
  
      if (search && search.trim() !== '') {
        queryParams.append('search', search.trim());
      }
  
      queryParams.append('page', page);
      queryParams.append('limit', limit);
  
      const response = await fetch(`${BASE_URL}/filter?${queryParams.toString()}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }
  
      return await response.json();
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      throw err;
    }
  };
  
  export const getProduct = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error getting product:', err);
      throw err;
    }
  };

  export const addProduct = async (token, product) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body: product,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };
  
  export const editProduct = async (token, id, formData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error editing product:', err);
      throw err;
    }
  };
  
  export const deleteProduct = async (token, id) => {
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
      console.error('Error deleting product:', err);
      throw err;
    }
  };
  
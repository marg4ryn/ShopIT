const BASE_URL = 'http://localhost:3000/api/products';

  export const fetchFilteredProducts = async (filters) => {
    try {
      const { category, minPrice, maxPrice, sortOption, search } = filters;
      const queryParams = new URLSearchParams();

      if (minPrice !== undefined) queryParams.append('min', minPrice);
      if (maxPrice !== undefined) queryParams.append('max', maxPrice);

      if (category && category.length > 0) {
        queryParams.append('categories', category.join(','));
      }

      if (sortOption === 'Descending price') {
        queryParams.append('sort', 'desc');
      } else if (sortOption === 'Rising price') {
        queryParams.append('sort', 'asc');
      }

      if (search && search.trim() !== '') {
        queryParams.append('search', search.trim());
      }

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
  
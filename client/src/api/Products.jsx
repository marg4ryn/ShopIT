export const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      return await response.json();
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  };
  
  export const addProduct = async (product) => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return await response.json();
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };
  
  export const editProduct = async (id, product) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return await response.json();
    } catch (err) {
      console.error('Error editing product:', err);
      throw err;
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete product');
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
  
      const response = await fetch(`http://localhost:3000/api/products/filter?${queryParams.toString()}`);
      return await response.json();
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      throw err;
    }
  };
  
const BASE_URL = import.meta.env.VITE_API_ORDERS;

export const getAllOrders = async (token) => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching all orders:', err);
    throw err;
  }
};

export const getOrderById = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    throw err;
  }
};

export const getOrdersByEmail = async (token, email) => {
  try {
    const response = await fetch(`${BASE_URL}/email/${encodeURIComponent(email)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching orders by email:', err);
    throw err;
  }
};

export const createOrder = async (token, orderData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error creating order:', err);
    throw err;
  }
};

export const deleteOrder = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error deleting order:', err);
    throw err;
  }
};

const BASE_URL = import.meta.env.VITE_API_ORDERS;

export const getAllOrders = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching all orders:', err);
    throw err;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    throw err;
  }
};

export const getOrdersByEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/email/${encodeURIComponent(email)}`);

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

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
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

export const updateOrder = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error updating order:', err);
    throw err;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
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

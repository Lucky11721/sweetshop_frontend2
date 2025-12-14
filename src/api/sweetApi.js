import api from './axiosConfig';

// GET /api/sweets
export const getAllSweets = async () => {
    const response = await api.get("/sweets");
    return response.data;
};

// GET /api/sweets/search?name=...
export const searchSweets = async (queryParams) => {
    // queryParams = { name, category, minPrice, maxPrice }
    const response = await api.get("/sweets/search", { params: queryParams });
    return response.data;
};

// POST /api/sweets (Protected)
export const addSweet = async (sweetData) => {
    const response = await api.post("/sweets", sweetData);
    return response.data;
};

// DELETE /api/sweets/{id} (Protected)
export const deleteSweet = async (id) => {
    await api.delete(`/sweets/${id}`);
};

// POST /api/sweets/{id}/purchase?quantity={qty}
// Matches @RequestParam int quantity
export const purchaseSweet = async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/purchase?quantity=${quantity}`);
    return response.data;
};

// POST /api/sweets/{id}/restock?quantity={qty}
// Matches @RequestParam int quantity
export const restockSweet = async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/restock?quantity=${quantity}`);
    return response.data;
};
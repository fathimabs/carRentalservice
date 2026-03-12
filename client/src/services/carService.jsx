import api from './api';

// Fetch all cars — supports filters, sort, pagination via params object
export const fetchCars = async (params = {}) => {
    const response = await api.get('/cars', { params });
    return response.data; // { success, total, page, totalPages, cars }
};

// Fetch a single car by its MongoDB _id
export const fetchCarById = async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data; // { success, car }
};

// Create a car — admin use
export const createCar = async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
};

// Update a car by id — admin use
export const updateCar = async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
};

// Delete a car by id — admin use
export const deleteCar = async (id) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
};
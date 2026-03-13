import axios from "axios"

const API = "http://localhost:5000/api/bookings"

export const createBooking = (data) => {
    return axios.post(API, data)
}

export const getUserBookings = () => {
    return axios.get(`${API}/user?userId=64f1a1b2c3d4e5f678901235`)
}

export const deleteBooking = (id) => {
    return axios.delete(`${API}/${id}`)
}
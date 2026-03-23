import React, { createContext, useContext, useReducer } from 'react'
import { fetchCars, fetchCarById } from '../services/carService'

export const CarContext = createContext()

const CAR_ACTIONS = {
    FETCH_START: 'FETCH_START',
    FETCH_CARS_SUCCESS: 'FETCH_CARS_SUCCESS',
    FETCH_CAR_SUCCESS: 'FETCH_CAR_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    SET_FILTERS: 'SET_FILTERS',
    RESET_FILTERS: 'RESET_FILTERS',
    SET_PAGE: 'SET_PAGE',
    SET_SORT: 'SET_SORT',
    CLEAR_SELECTED: 'CLEAR_SELECTED',
    TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE'
};
const savedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

const initialState = {
    cars: [],
    selectedCar: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
    filters: {
        search: '',
        category: '',
        transmission: '',
        fuelType: '',
        minPrice: '',
        maxPrice: '',
        capacity: '',
    },
    favourites: savedFavourites,
    sort: 'createdAt',
    order: 'desc',
};

const carReducer = (state, action) => {

    switch (action.type) {
        case CAR_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: null }

        case CAR_ACTIONS.FETCH_CARS_SUCCESS:
            return {
                ...state,
                loading: false,
                cars: action.payload.cars || [],
                total: action.payload.total || 0,
                page: action.payload.page || 1,
                totalPages: action.payload.totalPages || 1,
            };

        case CAR_ACTIONS.FETCH_CAR_SUCCESS:
            return { ...state, loading: false, selectedCar: action.payload }

        case CAR_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: action.payload }

        case CAR_ACTIONS.SET_FILTERS:
            return { ...state, filters: { ...state.filters, ...action.payload }, page: 1 }

        case CAR_ACTIONS.RESET_FILTERS:
            return { ...state, filters: initialState.filters, page: 1 }

        case CAR_ACTIONS.SET_PAGE:
            return { ...state, page: action.payload }

        case CAR_ACTIONS.SET_SORT:
            return { ...state, sort: action.payload.sort, order: action.payload.order }

        case CAR_ACTIONS.TOGGLE_FAVOURITE: {
            const exists = state.favourites.find(c => c._id === action.payload._id);
            const updated = exists
                ? state.favourites.filter(c => c._id !== action.payload._id)
                : [...state.favourites, action.payload];
            localStorage.setItem('favourites', JSON.stringify(updated));
            return { ...state, favourites: updated };
        }

        case CAR_ACTIONS.CLEAR_SELECTED:
            return { ...state, selectedCar: null }

        default:
            return state
    }
};

export const CarProvider = ({ children }) => {

    const [state, dispatch] = useReducer(carReducer, initialState)

    const loadCars = async (params = {}) => {
        dispatch({ type: CAR_ACTIONS.FETCH_START })

        try {
            const cleaned = Object.fromEntries(
                Object.entries(params).filter(([, v]) => v !== '' && v !== undefined)
            );
            const data = await fetchCars(cleaned)
            dispatch({ type: CAR_ACTIONS.FETCH_CARS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({
                type: CAR_ACTIONS.FETCH_ERROR,
                payload: error.response?.data?.message || 'Failed to load cars',
            });
        }
    };

    const loadCarById = async (id) => {
        dispatch({ type: CAR_ACTIONS.FETCH_START })

        try {
            const data = await fetchCarById(id)
            dispatch({ type: CAR_ACTIONS.FETCH_CAR_SUCCESS, payload: data.car })
        } catch (error) {
            dispatch({
                type: CAR_ACTIONS.FETCH_ERROR,
                payload: error.response?.data?.message || 'Failed to load car details',
            });
        }
    };
    const toggleFavourite = (car) =>
        dispatch({ type: CAR_ACTIONS.TOGGLE_FAVOURITE, payload: car });
    const setFilters = (filters) =>
        dispatch({ type: CAR_ACTIONS.SET_FILTERS, payload: filters })

    const resetFilters = () =>
        dispatch({ type: CAR_ACTIONS.RESET_FILTERS })

    const setPage = (page) =>
        dispatch({ type: CAR_ACTIONS.SET_PAGE, payload: page })

    const setSort = (sort, order = 'desc') =>
        dispatch({ type: CAR_ACTIONS.SET_SORT, payload: { sort, order } })

    const clearSelectedCar = () =>
        dispatch({ type: CAR_ACTIONS.CLEAR_SELECTED })

    const value = {
        ...state,
        loadCars,
        loadCarById,
        setFilters,
        resetFilters,
        setPage,
        setSort,
        clearSelectedCar, toggleFavourite
    };

    return <CarContext.Provider value={value}>{children}</CarContext.Provider>
};

export const useCar = () => {

    const context = useContext(CarContext)
    if (!context) throw new Error('useCar must be used within a CarProvider')
    return context;
};

export default CarContext
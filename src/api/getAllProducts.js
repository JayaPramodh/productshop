import axios from "axios";

const BaseURL = 'https://api.escuelajs.co/api/v1/';

export const getAllProducts = async () => {
    const productsurl = `${BaseURL}products`;

    try {
        const response = await axios.get(productsurl);
        return Array.isArray(response?.data) ? response.data : response?.data?.products ?? [];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
};
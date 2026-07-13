import axios from "axios";

const BaseURL = 'https://api.escuelajs.co/api/v1/';

export const getAllCategories = async () => {
    const categoriesurl = `${BaseURL}categories`;

    try {
        const response = await axios.get(categoriesurl);
        return Array.isArray(response?.data) ? response.data : response?.data?.categories ?? [];
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
};
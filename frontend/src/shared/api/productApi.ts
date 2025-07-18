import { IProduct } from '../../entities/Product/types/Product';

const API_BASE_URL = import.meta.env.VITE_API_URI; // Изменено на 5000 для локального запуска

export const productApi = {
    getAllProducts: async (query = ''): Promise<IProduct[]> => {
        const response = await fetch(API_BASE_URL + query);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getBrands: async (gender?: string): Promise<string[]> => {
        const url = `${API_BASE_URL}/brands/all${gender ? `?gender=${gender}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getSizes: async (
        gender?: string,
    ): Promise<{ sizesEu: string[]; sizesUs: string[]; sizesMm: string[] }> => {
        const url = `${API_BASE_URL}/sizes/all${gender ? `?gender=${gender}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getProductById: async (id: string): Promise<IProduct> => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    createProduct: async (
        product: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>,
    ): Promise<IProduct> => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    updateProduct: async (id: string, product: Partial<IProduct>): Promise<IProduct> => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    deleteProduct: async (id: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // No content expected for successful deletion
    },

    incrementProductRating: async (id: string): Promise<IProduct> => {
        const response = await fetch(`${API_BASE_URL}/${id}/increment-rating`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
};

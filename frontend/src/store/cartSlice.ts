import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@entities/Product/types/Product';

interface CartItem extends IProduct {
    selectedSize?: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isCartOpen: boolean;
    quickBuyProduct: CartItem | null;
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
    isCartOpen: false,
    quickBuyProduct: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart(state, action: PayloadAction<{ id: string; selectedSize?: string }>) {
            state.items = state.items.filter(
                (item) =>
                    !(
                        item._id === action.payload.id &&
                        item.selectedSize === action.payload.selectedSize
                    ),
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        openCart(state) {
            state.isCartOpen = true;
        },
        closeCart(state) {
            state.isCartOpen = false;
        },
        openQuickBuy(state, action: PayloadAction<CartItem>) {
            state.quickBuyProduct = action.payload;
        },
        closeQuickBuy(state) {
            state.quickBuyProduct = null;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    openQuickBuy,
    closeQuickBuy,
} = cartSlice.actions;

export default cartSlice.reducer;

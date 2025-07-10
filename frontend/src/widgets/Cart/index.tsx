import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@store/index';
import { closeCart, closeQuickBuy, removeFromCart, clearCart } from '@store/cartSlice';
import styles from './index.module.css';

const CartPopup = () => {
    const { items, isCartOpen, quickBuyProduct } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCartOpen || quickBuyProduct) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isCartOpen, quickBuyProduct]);

    if (!isCartOpen && !quickBuyProduct) return null;

    const handleClose = () => {
        dispatch(closeCart());
        dispatch(closeQuickBuy());
    };

    if (quickBuyProduct) {
        return (
            <div className={styles.cartPopupOverlay} onClick={handleClose}>
                <div className={styles.cartPopup} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        &times;
                    </button>
                    <h2>Быстрый заказ</h2>
                    <div>
                        {quickBuyProduct.name} ({quickBuyProduct.selectedSize ?? '-'}) x
                        {quickBuyProduct.quantity}
                    </div>
                    {/* Здесь может быть форма для оформления быстрого заказа */}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPopupOverlay} onClick={handleClose}>
            <div className={styles.cartPopup} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Оформление заказа</h2>
                <div>
                    {items.length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        <>
                            <ul>
                                {items.map((item, idx) => (
                                    <li
                                        key={
                                            String(item._id) +
                                            ':' +
                                            String(item.selectedSize) +
                                            ':' +
                                            idx
                                        }
                                    >
                                        {item.name} ({item.selectedSize ?? '-'}) — {item.price}₽
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart({
                                                        id: String(item._id),
                                                        selectedSize: item.selectedSize ?? '',
                                                    }),
                                                )
                                            }
                                        >
                                            Удалить
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.cartTotal}>
                                Итого: {items.reduce((sum, item) => sum + (item.price || 0), 0)}₽
                            </div>
                        </>
                    )}
                </div>
                <button onClick={() => dispatch(clearCart())}>Очистить корзину</button>
            </div>
        </div>
    );
};

export default CartPopup;

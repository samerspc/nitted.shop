import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { closeCart, closeQuickBuy, removeFromCart, clearCart } from '@store/cartSlice';

const CartPopup = () => {
  const { items, isCartOpen, quickBuyProduct } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // Показываем попап если открыт хотя бы один режим
  if (!isCartOpen && !quickBuyProduct) return null;

  // Закрытие попапа
  const handleClose = () => {
    dispatch(closeCart());
    dispatch(closeQuickBuy());
  };

  // Если быстрый заказ — показываем только один товар
  if (quickBuyProduct) {
    return (
      <div className="cart-popup">
        <button onClick={handleClose}>Закрыть</button>
        <h2>Быстрый заказ</h2>
        <div>
          {quickBuyProduct.name} ({quickBuyProduct.selectedSize ?? '-'}) x{quickBuyProduct.quantity}
        </div>
        {/* Здесь может быть форма для оформления быстрого заказа */}
      </div>
    );
  }

  // Обычная корзина
  return (
    <div className="cart-popup">
      <button onClick={handleClose}>Закрыть</button>
      <h2>Корзина</h2>
      {items.length === 0 ? <p>Корзина пуста</p> : (
        <ul>
          {items.map((item, idx) => (
            <li key={String(item._id) + ':' + String(item.selectedSize) + ':' + idx}>
              {item.name} ({item.selectedSize ?? '-'}) x{item.quantity}
              <button onClick={() => dispatch(removeFromCart({ id: String(item._id), selectedSize: item.selectedSize ?? '' }))}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => dispatch(clearCart())}>Очистить корзину</button>
    </div>
  );
};

export default CartPopup; 
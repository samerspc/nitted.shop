import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@store/index';
import { closeCart, closeQuickBuy, removeFromCart, clearCart } from '@store/cartSlice';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import remove from '/cart/close.svg'
import { sendOrderRequest } from '@features/SendRequest';

const CartPopup = () => {
    const { items, isCartOpen, quickBuyProduct } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile:boolean = (window.innerWidth <= 600) ? true : false;

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

    const handleClickItem = (id: string | undefined) => {
      if (id) navigate(`/product/${id}`);
    }

    const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>, quickBuy?: boolean) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const tg = formData.get('tg') as string;
      const phone = formData.get('phone') as string;
      const privacy = formData.get('privacy');
      if (!name || !tg || !phone || !privacy) {
        alert('Пожалуйста, заполните все поля и согласитесь с политикой.');
        return;
      }
      const products = quickBuyProduct && quickBuy ? [quickBuyProduct] : items;
      const ok = await sendOrderRequest({ name, tg, phone }, products);
      if (ok) {
        alert('Заявка успешно отправлена!');
        if (!quickBuy) dispatch(clearCart());
        handleClose();
      } else {
        alert('Ошибка при отправке заявки. Попробуйте позже.');
      }
    };

    if (quickBuyProduct) {
        return (
            <div className={styles.cartPopupOverlay} onClick={handleClose}>
            {isMobile && <p  onClick={handleClose} className={styles.mobileClose}>Закрыть</p>}
            <div className={styles.cartPopup} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Покупка в 1 клик</h2>
                <div>
                    {items.length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        <>
                            <ul>
                                    <li>
                                        <div 
                                          style={{
                                            backgroundImage: `url('${quickBuyProduct.images[0]}')`
                                          }}
                                          className={styles.imgItem}
                                          onClick={() => handleClickItem(quickBuyProduct._id)}
                                          >
                                        </div>
                                        
                                        <div className={styles.infoItem} onClick={() => handleClickItem(quickBuyProduct._id)}>
                                          <p className={styles.infoItem_name}>{quickBuyProduct.name}</p>
                                          <p className={styles.infoItem_size}>
                                            Размер
                                            <span className='aeroport'>:</span>
                                            {`${quickBuyProduct.selectedSize}`}</p>
                                            {isMobile && 
                                              <p className={styles.priceItem}>
                                                {quickBuyProduct.price}
                                                <span className='aeroport'>$</span>
                                              </p>
                                            }
                                        </div>
                                        
                                        
                                        {!isMobile && 
                                              <p className={styles.priceItem}>
                                                {quickBuyProduct.price}
                                                <span className='aeroport'>$</span>
                                              </p>
                                            }

                                        <img
                                            src={remove}
                                            className={styles.removeFrom}
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart({
                                                        id: String(quickBuyProduct._id),
                                                        selectedSize: quickBuyProduct.selectedSize ?? '',
                                                    }),
                                                )
                                            }
                                        >
                                        </img>
                                    </li>
                            </ul>
                            

                            <form className={styles.orderForm} onSubmit={e => handleOrderSubmit(e, true)}>
                                <div className={styles.inputWrapper}>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={styles.input}
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="name" className={styles.floatingLabel}>
                                    Ваше имя
                                  </label>
                                </div>

                                <div className={`${styles.inputWrapper} ${styles.inputMargin}`}>
                                  <input
                                    type="text"
                                    name="tg"
                                    id="tg"
                                    className={styles.input}
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="tg" className={styles.floatingLabel}>
                                    <span className='aeroport'>@</span>
                                    Ваш телеграм
                                  </label>
                                </div>
                                
                                <div className={`${styles.inputWrapper} ${styles.inputMargin}`}>
                                  <input
                                    type="tel"
                                    name="phone"
                                    id="tel"
                                    className={styles.input}
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="tel" className={styles.floatingLabel}>
                                    <span className='aeroport'>+</span>
                                    7(999)777-87-97
                                  </label>
                                </div>

                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="privacy"
                                        required
                                        className={styles.checkbox}
                                    />
                                    Я согласен с политикой конфиденциальности
                                </label>

                                <div className={styles.cartTotal}>
                                  <p className={styles.colorSecond}>
                                    Итого
                                    <span className='aeroport'>:</span>
                                  </p>
                                  <p className={styles.colorMain}>
                                    {quickBuyProduct.price}
                                    <span className='aeroport'>$</span>
                                  </p>
                                </div>

                              <button 
                                type="submit"
                                className={styles.makeOrder}>
                                Создать заявку
                              </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
          </div>
        );
    }

    return (
        <div className={styles.cartPopupOverlay} onClick={handleClose}>
            {isMobile && <p  onClick={handleClose} className={styles.mobileClose}>Закрыть</p>}
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
                                        <div 
                                          style={{
                                            backgroundImage: `url('${item.images[0]}')`
                                          }}
                                          className={styles.imgItem}
                                          onClick={() => handleClickItem(item._id)}
                                          >
                                        </div>
                                        
                                        <div className={styles.infoItem} onClick={() => handleClickItem(item._id)}>
                                          <p className={styles.infoItem_name}>{item.name}</p>
                                          <p className={styles.infoItem_size}>
                                            Размер
                                            <span className='aeroport'>:</span>
                                            {`${item.selectedSize}`}
                                          </p>
                                          {isMobile && 
                                            <p className={styles.priceItem}>
                                              {item.price}
                                              <span className='aeroport'>$</span>
                                            </p>
                                          }
                                        </div>

                                        {!isMobile && 
                                            <p className={styles.priceItem}>
                                              {item.price}
                                              <span className='aeroport'>$</span>
                                            </p>
                                          }
                                        
                                        <img
                                            src={remove}
                                            className={styles.removeFrom}
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart({
                                                        id: String(item._id),
                                                        selectedSize: item.selectedSize ?? '',
                                                    }),
                                                )
                                            }
                                        >
                                        </img>
                                    </li>
                                ))}
                            </ul>

                            <form className={styles.orderForm} onSubmit={e => handleOrderSubmit(e, false)}>
                                <div className={styles.inputWrapper}>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={styles.input}
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="name" className={styles.floatingLabel}>
                                    Ваше имя
                                  </label>
                                </div>

                                <div className={`${styles.inputWrapper} ${styles.inputMargin}`}>
                                  <input
                                    type="text"
                                    name="tg"
                                    id="tg"
                                    className={styles.input}
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="tg" className={styles.floatingLabel}>
                                    <span className='aeroport'>@</span>
                                    Ваш телеграм
                                  </label>
                                </div>
                                
                                <div className={`${styles.inputWrapper} ${styles.inputMargin}`}>
                                  <input
                                    type="tel"
                                    name="phone"
                                    id="tel"
                                    className={styles.input}
                                    required
                                    placeholder=" "
                                  />
                                  <label htmlFor="tel" className={styles.floatingLabel}>
                                    <span className='aeroport'>+</span>
                                    7(999)777-87-97
                                  </label>
                                </div>

                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="privacy"
                                        required
                                        className={styles.checkbox}
                                    />
                                    Я согласен с политикой конфиденциальности
                                </label>

                                <div className={styles.cartTotal}>
                                <p className={styles.colorSecond}>
                                  Итого
                                  <span className='aeroport'>:</span>
                                </p>
                                <p className={styles.colorMain}>
                                  {items.reduce((sum, item) => sum + (item.price || 0), 0)}
                                  <span className='aeroport'>$</span>
                                </p>
                              </div>

                              <button 
                                type="submit"
                                className={styles.makeOrder}>
                                Создать заявку
                              </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPopup;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '@shared/api/productApi';
import { IProduct } from '@entities/Product/types/Product';
import closeIcon from '/product_page/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, openQuickBuy, removeFromCart } from '@store/cartSlice';
import { RootState } from '@store/index';

import styles from './index.module.css';

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sizeMetrick, setSizeMetrick] = useState<'eu' | 'us' | 'mm'>('eu');
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const isInCart = !!cartItems.find(
        (item) => item._id === product?._id && item.selectedSize === selectedSize,
    );
    const isMobile: boolean = window.innerWidth <= 600 ? true : false;

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        productApi
            .getProductById(id)
            .then(setProduct)
            .catch(() => setError('Товар не найден'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return null;

    return (
        <>
            { isMobile ?
                <p 
                    className={styles.closeIcon}
                    onClick={() => window.history.back()}>
                        Закрыть
                </p>
                :
                <img
                    src={closeIcon}
                    className={styles.closeIcon}
                    onClick={() => window.history.back()}
                    alt=""
                />
            }

            <div className={styles.wrapper}>
                <div className={styles.imgs}>
                    {product.images.map((item, i) => (
                        <img key={i} src={item} alt=""
                        className={i === 0 && isMobile ? styles.p12 : ''}/>
                    ))}
                    {product.images.map((item, i) => (
                        <img key={i} src={item} alt="" />
                    ))}
                </div>

                <div className={`${styles.info_wrapper} ${styles.gap40}`}>
                    <div className={styles.gap10}>
                        <p className={styles.info_wrapper__name}>{product.name}</p>
                        <p className={styles.info_wrapper__price}>
                            {product.price}
                            <span className={`aeroport ${styles.w600}`}>$</span>
                        </p>
                    </div>

                    <div className={styles.gap10}>
                        <div className={styles.sizes_сhooseButtons}>
                            <p
                                className={`${sizeMetrick === 'eu' && styles.sizeChooseButtonActive} ${styles.sizeChooseButton}`}
                                onClick={() => setSizeMetrick('eu')}
                            >
                                Eu
                            </p>
                            <p
                                className={`${sizeMetrick === 'us' && styles.sizeChooseButtonActive} ${styles.sizeChooseButton}`}
                                onClick={() => setSizeMetrick('us')}
                            >
                                Us
                            </p>
                            <p
                                className={`${sizeMetrick === 'mm' && styles.sizeChooseButtonActive} ${styles.sizeChooseButton}`}
                                onClick={() => setSizeMetrick('mm')}
                            >
                                Mm
                            </p>
                        </div>

                        <div className={styles.sizes_items}>
                            {sizeMetrick === 'eu' &&
                                product.sizesEu.map((item, i) => (
                                    <button
                                        key={i}
                                        className={`${selectedSize === item ? styles.sizeButtonActive : ''} ${styles.sizeButton}`}
                                        onClick={() => setSelectedSize(item)}
                                        type="button"
                                    >
                                        {item}
                                    </button>
                                ))}
                            {sizeMetrick === 'us' &&
                                product.sizesUs.map((item, i) => (
                                    <button
                                        key={i}
                                        className={`${selectedSize === item ? styles.sizeButtonActive : ''} ${styles.sizeButton}`}
                                        onClick={() => setSelectedSize(item)}
                                        type="button"
                                    >
                                        {item}
                                    </button>
                                ))}
                            {sizeMetrick === 'mm' &&
                                product.sizesMm.map((item, i) => (
                                    <button
                                        key={i}
                                        className={`${selectedSize === item ? styles.sizeButtonActive : ''} ${styles.sizeButton}`}
                                        onClick={() => setSelectedSize(item)}
                                        type="button"
                                    >
                                        {item}
                                    </button>
                                ))}
                        </div>

                        <p>
                            {product.inStock ? (
                                <>
                                    <span className={styles.inStock}>В наличии.</span>{' '}
                                    <span className={styles.isInStock_text}>
                                        Доставка по Москве бесплатно.
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className={styles.notInStock}>На заказ.</span>{' '}
                                    <span className={styles.isInStock_text}>
                                        Доставка в течение 2-3 недель.
                                    </span>
                                </>
                            )}
                        </p>
                    </div>

                    <div className={`${styles.buttons} ${styles.gap10}`}>
                        <button
                            className={styles.addToCart}
                            onClick={() => {
                                if (!selectedSize) return alert('Выберите размер!');
                                if (isInCart) {
                                    dispatch(
                                        removeFromCart({
                                            id: String(product?._id),
                                            selectedSize: selectedSize || '',
                                        }),
                                    );
                                } else {
                                    dispatch(addToCart({ ...product, selectedSize, quantity: 1 }));
                                }
                            }}
                        >
                            {isInCart ? 'Удалить из корзины' : 'Добавить в корзину'}
                        </button>
                        <button
                            className={styles.buyNow}
                            onClick={() => {
                                if (!selectedSize) return alert('Выберите размер!');
                                dispatch(openQuickBuy({ ...product, selectedSize, quantity: 1 }));
                            }}
                        >
                            Купить в 1 клик
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;

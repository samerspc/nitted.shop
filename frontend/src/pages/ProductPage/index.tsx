import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '@shared/api/productApi';
import { IProduct } from '@entities/Product/types/Product';
import closeIcon from '/product_page/close.svg'

import styles from './index.module.css'


const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productApi.getProductById(id)
      .then(setProduct)
      .catch(() => setError('Товар не найден'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return null;

  return (<>
    <img src={closeIcon} 
    className={styles.closeIcon} 
    onClick={() => window.history.back()}
    alt="" />    

    <div className={styles.wrapper}>
      <div className={styles.imgs}>
          {product.images.map((item, i) => (
            <img key={i} src={item} alt="" />
          ))}
      </div>
    
      <div className={`${styles.info_wrapper} ${styles.gap40}`}>
          <div className={styles.gap10}>
            <p className={styles.info_wrapper__name}>{product.name}</p>
            <p className={styles.info_wrapper__price}>{product.price}$</p>
          </div>
          
          <div className={styles.sizes_wrapper}>  
            <div className={styles.sizes_buttons}>

            </div>
            
            <div className={styles.sizes_items}>

            </div>
            
            <p>
              {product.inStock ? 
                <><span>В наличии.</span> <span>Доставка по Москве бесплатно.</span></>
                : <><span>На заказ.</span> <span>Доставка в течение 2-3 недель.</span></>
              }
            </p>
          </div>

          <div className={styles.buttons}>
              <button></button>
              <button></button>
          </div>
          {/* <div>
            <p><b>Бренд:</b> {product.brand}</p>
            <p><b>Цена:</b> {product.price} <span className="aeroport">$</span></p>
            <p><b>В наличии:</b> {product.inStock ? 'Да' : 'Нет'}</p>
            <p><b>Рейтинг:</b> {product.rating}</p>
            <p><b>Пол:</b> {product.gender === 'male' ? 'Мужской' : 'Женский'}</p>
            <p><b>Размеры EU:</b> {product.sizesEu.join(', ')}</p>
            <p><b>Размеры US:</b> {product.sizesUs.join(', ')}</p>
            <p><b>Размеры MM:</b> {product.sizesMm.join(', ')}</p>
          </div> */}
      </div>
    </div>
    </>
  );
};

export default ProductPage; 
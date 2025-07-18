import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

import Card from '@entities/Product/ui/Card';
import { IProduct } from '@entities/Product/types/Product';

const product = {
    _id: '...',
    name: 'Nike Air Max',
    brand: 'Nike',
    images: [
        '/MaleCatalogPreview/item.png',
        '/MaleCatalogPreview/item2.png',
        '/MaleCatalogPreview/item3.png',
    ],
    inStock: true,
    sizesEu: ['42', '43'],
    sizesUs: ['9', '10'],
    sizesMm: ['270', '280'],
    rating: 5,
    price: 1000,
    gender: 'male',
    createdAt: '...',
    updatedAt: '...',
} as IProduct;

const FemaleCatalogPreview: FC = () => {
    const windWidth = window.innerWidth;
    const isMobile: boolean = windWidth <= 600 ? true : false;
    const isLaptop: boolean = (windWidth > 600 && windWidth <= 1800) ? true : false;
    return (
        <>
            <section className={styles.wrapper}>
                <p className={styles.h1}>Женская одежда</p>

                <div className={styles.cards_wrapper}>
                    { isMobile ?
                        <>
                        <Card data={product} className={'default'} />
                        <Card data={product} className={'default'} />
                        </>
                    :
                    <>
                    <Card data={product} className={'large'} customPlaceLeft={isLaptop ? 20 : 40} />

                    <Card data={product} className={'mini'} customPlaceLeft={isLaptop ? 416 : 585} />

                    <div className={styles.mid_cards_wrapper}>
                        <div className={styles.mid_cards}>
                            <Card data={product} className={'default'} />
                            <Card data={product} className={'default'} />
                        </div>
                        <Link to="/catalog/female" className={styles.mid_cards_wrapper_link}>
                            Вся женская одежда
                        </Link>
                    </div>
                    </>
                    }
                </div>
            </section>
        </>
    );
};

export default FemaleCatalogPreview;

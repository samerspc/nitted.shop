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

const MaleCatalogPreview: FC = () => {
    const windWidth = window.innerWidth;
    const isMobile: boolean = windWidth <= 600 ? true : false;
    const isLaptop: boolean = (windWidth > 600 && windWidth <= 1800) ? true : false;

    return (
        <>
            <section className={styles.wrapper}>
                <p className={styles.h1}>Мужская одежда</p>

                <div className={styles.cards_wrapper}>
                    { isMobile ?
                        <>
                        <Card data={product} className={'default'} />
                        <Card data={product} className={'default'} />
                        </>
                    :
                    <>
                    <Card data={product} className={'mini'} customPlaceLeft={isLaptop ? 20 : 40} />

                    <div className={styles.mid_cards_wrapper}>
                        <div className={styles.mid_cards}>
                            <Card data={product} className={'default'} />
                            <Card data={product} className={'default'} />
                        </div>
                        <Link to="/calalog/male" className={styles.mid_cards_wrapper_link}>
                            Вся мужская одежда
                        </Link>
                    </div>

                    <Card data={product} className={'large'} customPlaceRight={isLaptop ? 20 : 40} />
                    </>
                    }
                </div>
            </section>
        </>
    );
};

export default MaleCatalogPreview;

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '@shared/api/productApi';
import Card from '@entities/Product/ui/Card';
import { IProduct } from '@entities/Product/types/Product';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

const genderTitles: Record<string, string> = {
    male: 'Мужская одежда',
    female: 'Женская одежда',
};

const sortOptions = [
    { value: 'rating_asc', label: 'Сортировать по популярноси', icon: '/catalog/inc.svg' },
    { value: 'rating_desc', label: 'Сортировать по популярноси', icon: '/catalog/dec.svg' },
    { value: 'price_asc', label: 'Сортировать по цене', icon: '/catalog/inc.svg' },
    { value: 'price_desc', label: 'Сортировать по цене', icon: '/catalog/dec.svg' },
];

const CatalogPage = () => {
    const navigate = useNavigate();
    const { gender } = useParams<{ gender: string }>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState<string[]>([]);
    const [sizes, setSizes] = useState<{ sizesEu: string[]; sizesUs: string[]; sizesMm: string[] }>(
        {
            sizesEu: [],
            sizesUs: [],
            sizesMm: [],
        },
    );
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [showSizeOptions, setShowSizeOptions] = useState(false);
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const sortRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gender) {
            navigate('/catalog/male', { replace: true });
        }
    }, [gender, navigate]);

    useEffect(() => {
        if (gender === 'male' || gender === 'female') {
            const params = new URLSearchParams();
            params.append('gender', gender);
            if (selectedBrand) params.append('brand', selectedBrand);
            if (selectedSize) {
                if (selectedSize.endsWith('EU'))
                    params.append('sizeEu', selectedSize.replace('EU', ''));
                if (selectedSize.endsWith('US'))
                    params.append('sizeUs', selectedSize.replace('US', ''));
                if (selectedSize.endsWith('MM'))
                    params.append('sizeMm', selectedSize.replace('MM', ''));
            }
            if (selectedSort) {
                if (selectedSort.value.startsWith('price')) {
                    params.append('sortBy', 'price');
                    params.append('order', selectedSort.value.endsWith('asc') ? 'asc' : 'desc');
                } else if (selectedSort.value.startsWith('rating')) {
                    params.append('sortBy', 'rating');
                    params.append('order', selectedSort.value.endsWith('asc') ? 'asc' : 'desc');
                }
            }
            setLoading(true);
            productApi.getAllProducts('?' + params.toString()).then((data) => {
                setProducts(data);
                setLoading(false);
            });
        }
    }, [gender, selectedBrand, selectedSize, selectedSort]);

    useEffect(() => {
        if (gender === 'male' || gender === 'female') {
            productApi.getBrands(gender).then(setBrands);
            productApi.getSizes(gender).then(setSizes);
        }
    }, [gender]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                sortRef.current &&
                !sortRef.current.contains(e.target as Node) &&
                sizeRef.current &&
                !sizeRef.current.contains(e.target as Node)
            ) {
                setShowSortOptions(false);
                setShowSizeOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    if (!gender) {
        return null;
    }

    if (loading) return <div>Загрузка...</div>;

    return (
        <section className={styles.wrapper}>
            <p className={styles.h1}>{genderTitles[gender]}</p>

            <aside className={styles.aside}>
                {brands.map((item, i) => (
                    <button
                        key={i}
                        className={
                            styles.brand_button +
                            (selectedBrand === item ? ' ' + styles.active : '')
                        }
                        onClick={() => setSelectedBrand(selectedBrand === item ? null : item)}
                    >
                        {item}
                    </button>
                ))}
                {brands.map((item, i) => (
                    <button
                        key={i}
                        className={
                            styles.brand_button +
                            (selectedBrand === item ? ' ' + styles.active : '')
                        }
                        onClick={() => setSelectedBrand(selectedBrand === item ? null : item)}
                    >
                        {item}
                    </button>
                ))}
                {brands.map((item, i) => (
                    <button
                        key={i}
                        className={
                            styles.brand_button +
                            (selectedBrand === item ? ' ' + styles.active : '')
                        }
                        onClick={() => setSelectedBrand(selectedBrand === item ? null : item)}
                    >
                        {item}
                    </button>
                ))}
                {brands.map((item, i) => (
                    <button
                        key={i}
                        className={
                            styles.brand_button +
                            (selectedBrand === item ? ' ' + styles.active : '')
                        }
                        onClick={() => setSelectedBrand(selectedBrand === item ? null : item)}
                    >
                        {item}
                    </button>
                ))}
                {brands.map((item, i) => (
                    <button
                        key={i}
                        className={
                            styles.brand_button +
                            (selectedBrand === item ? ' ' + styles.active : '')
                        }
                        onClick={() => setSelectedBrand(selectedBrand === item ? null : item)}
                    >
                        {item}
                    </button>
                ))}
            </aside>

            <div className={styles.sorts_wrapper}>
                <div ref={sortRef} style={{ display: 'inline-block', position: 'relative' }}>
                    <button
                        onClick={() => setShowSortOptions((s) => !s)}
                        className={styles.sorts_wrapper_button_sorts}
                    >
                        {selectedSort.label}
                        <img src={selectedSort.icon} className={styles.sort_icon} alt="" />
                    </button>
                    {showSortOptions && (
                        <div className={styles.sorts_wrapper_options_sorts}>
                            {sortOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        setSelectedSort(option);
                                        setShowSortOptions(false);
                                    }}
                                    style={{
                                        fontWeight:
                                            selectedSort.value === option.value
                                                ? 'bold'
                                                : undefined,
                                    }}
                                    className={styles.sorts_wrapper_options_sorts__item}
                                >
                                    <p>{option.label}</p>
                                    <img src={option.icon} className={styles.sort_icon} alt="" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div ref={sizeRef} style={{ display: 'inline-block', position: 'relative' }}>
                    <button
                        onClick={() => setShowSizeOptions((s) => !s)}
                        className={styles.sorts_wrapper_button_size}
                    >
                        {selectedSize || 'Размер'}
                    </button>
                    {showSizeOptions && (
                        <div className={styles.sorts_wrapper_options_size}>
                            {sizes.sizesEu.map((size) => (
                                <div
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(`${size}EU`);
                                        setShowSizeOptions(false);
                                    }}
                                    style={{
                                        fontWeight:
                                            selectedSize === `${size}EU` ? 'bold' : undefined,
                                    }}
                                    className={styles.sorts_wrapper_options_size__item}
                                >
                                    {size}EU
                                </div>
                            ))}
                            {sizes.sizesUs.map((size) => (
                                <div
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(`${size}US`);
                                        setShowSizeOptions(false);
                                    }}
                                    style={{
                                        fontWeight:
                                            selectedSize === `${size}US` ? 'bold' : undefined,
                                    }}
                                    className={styles.sorts_wrapper_options_size__item}
                                >
                                    {size}US
                                </div>
                            ))}
                            {sizes.sizesMm.map((size) => (
                                <div
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(`${size}MM`);
                                        setShowSizeOptions(false);
                                    }}
                                    style={{
                                        fontWeight:
                                            selectedSize === `${size}MM` ? 'bold' : undefined,
                                    }}
                                    className={styles.sorts_wrapper_options_size__item}
                                >
                                    {size}MM
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.card_wrapper}>
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
                {products.map((product) => (
                    <Card key={product._id} data={product} className={'default'} />
                ))}
            </div>
        </section>
    );
};

export default CatalogPage;

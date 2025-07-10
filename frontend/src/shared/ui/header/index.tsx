import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { openCart } from '@store/cartSlice';

import styles from './index.module.css';
import searchIcon from '/header/search.svg';

const Header: FC = () => {
    const [hide, setHide] = useState<boolean>(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const cartHandleClick = (): void => {
        dispatch(openCart());
    };

    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
    );

    useEffect(() => {
        if (location.pathname.startsWith('/product')) setHide(true);
        else setHide(false);
    }, [location.pathname]);

    return (
        <header className={`block ${styles.wrapper} ${hide ? styles.display_none : ''}`}>
            <Link to="/" className={`${styles.logo} ${styles.aps_position} crimson-text-regular`}>
                nitted.
            </Link>

            <div className={`${styles.middle_content_wrapper}`}>
                <div className={`${styles.aps_position} ${styles.search_wrapper}`}>
                    <img src={searchIcon} alt="" />
                    <input id="search" type="text" placeholder="Поиск" className="aeroport-mono" />
                </div>

                <nav>
                    <Link to="/catalog/male" className={styles.Link}>
                        Мужское
                    </Link>
                    <Link to="/catalog/female" className={styles.Link}>
                        Женское
                    </Link>
                </nav>
            </div>

            <p className={styles.cart} onClick={cartHandleClick}>
                Корзина
                <span className="aeroport">{`(`}</span>
                {cartCount}
                <span className="aeroport">{`)`}</span>
            </p>
        </header>
    );
};

export default Header;

import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from './index.module.css';
import searchIcon from '/header/search.svg'

const Header: FC = () => {
    let hide: boolean = false;
    if (location.pathname.startsWith('/product')) hide = true;
    console.log(location.pathname)

    const navigate = useNavigate();
    const cartHandleClick = ():void => {
        navigate('/cart')
    }



    return (
        <header className={`block ${styles.wrapper} ${hide ? styles.display_none : ''}`}>
            <Link to="/" className={`${styles.logo} ${styles.aps_position} crimson-text-regular`}>
                nitted.
            </Link>

            <div className={`${styles.middle_content_wrapper}`}>
                <div className={`${styles.aps_position} ${styles.search_wrapper}`}>
                    <img src={searchIcon} alt="" />
                    <input id="search" type="text" placeholder="Поиск" className="aeroport-mono"/>
                </div>

                <nav>
                    <Link to="/catalog/male" className={styles.Link}>Мужское</Link>
                    <Link to="/catalog/female" className={styles.Link}>Женское</Link>
                </nav>
            </div>

            <p className={styles.cart} onClick={cartHandleClick}>
                Корзина 
                <span className="aeroport">{`(`}</span>
                {`0`}
                <span className="aeroport">{`)`}</span>
            </p>
        </header>
        );
};

export default Header;
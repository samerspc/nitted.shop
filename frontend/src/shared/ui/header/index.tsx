import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { openCart } from '@store/cartSlice';

import styles from './index.module.css';
import searchIcon from '/header/search.svg';
import dots from '/header/dots.svg';

const Header: FC = () => {
  const [hide, setHide] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const isMobile: boolean = window.innerWidth <= 600 ? true : false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  //
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
  }, [isMobileMenuOpen]);

  const handleOpenMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  if (isMobile) {
    if (location.pathname.startsWith('/catalog')) {
      return (
        <>
          {isMobileMenuOpen && (
            <div onClick={handleOpenMobileMenu} className={styles.mobileMenuPopUp_layout}>
              <div className={styles.mobileMenuPopUp_menu}>
                <Link to="/catalog/male" className={styles.mobileMenuPopUp_menu_link}>
                  Поиск
                </Link>
                <Link to="/catalog/male" className={styles.mobileMenuPopUp_menu_link}>
                  Мужское
                </Link>
                <Link to="/catalog/female" className={styles.mobileMenuPopUp_menu_link}>
                  Женское
                </Link>
              </div>
            </div>
          )}
          <header
            className={`${styles.wrapper} 
                                        ${hide ? styles.display_none : ''}
                                        ${isMobileMenuOpen ? styles.wrapperOpenMenu : ''}`}
          >
            {isMobileMenuOpen ? (
              <>
                <p onClick={handleOpenMobileMenu} className={styles.mobileMenuTitle}>
                  Меню
                </p>
                <Link
                  to="/"
                  className={`${isMobileMenuOpen ? styles.logoMenuOpen : styles.logo} crimson-text-regular`}
                >
                  nitted.
                </Link>
                <p className={styles.cart} onClick={cartHandleClick}>
                  Корзина
                  <span className="aeroport">{`(`}</span>
                  {cartCount}
                  <span className="aeroport">{`)`}</span>
                </p>
              </>
            ) : (
              <>
                <Link to="/" className={`${styles.ctalogMenuLogo} crimson-text-regular`}>
                  nitted.
                </Link>
                <div className={`${styles.aps_position} ${styles.search_wrapper}`}>
                  <input id="search" type="text" placeholder="Поиск" className="aeroport-mono" />
                </div>
                <img
                  src={dots}
                  onClick={handleOpenMobileMenu}
                  className={styles.mobileMenuDots}
                ></img>
              </>
            )}
          </header>
        </>
      );
    }

    return (
      <>
        {isMobileMenuOpen && (
          <div onClick={handleOpenMobileMenu} className={styles.mobileMenuPopUp_layout}>
            <div className={styles.mobileMenuPopUp_menu}>
              <Link to="/catalog/male" className={styles.mobileMenuPopUp_menu_link}>
                Поиск
              </Link>
              <Link to="/catalog/male" className={styles.mobileMenuPopUp_menu_link}>
                Мужское
              </Link>
              <Link to="/catalog/female" className={styles.mobileMenuPopUp_menu_link}>
                Женское
              </Link>
            </div>
          </div>
        )}
        <header
          className={`${styles.wrapper} 
                                ${hide ? styles.display_none : ''}
                                ${isMobileMenuOpen ? styles.wrapperOpenMenu : ''}`}
        >
          <p onClick={handleOpenMobileMenu} className={styles.mobileMenuTitle}>
            Меню
          </p>

          <Link
            to="/"
            className={`${isMobileMenuOpen ? styles.logoMenuOpen : styles.logo} crimson-text-regular`}
          >
            nitted.
          </Link>

          <p className={styles.cart} onClick={cartHandleClick}>
            Корзина
            <span className="aeroport">{`(`}</span>
            {cartCount}
            <span className="aeroport">{`)`}</span>
          </p>
        </header>
      </>
    );
  }

  return (
    <header className={`block ${styles.wrapper} ${hide ? styles.display_none : ''}`}>
      <Link to="/" className={`${styles.logo} ${styles.aps_position} crimson-text-regular`}>
        nitted.
      </Link>
      {isMobile}
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

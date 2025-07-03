import { FC } from "react";
import { Link } from "react-router-dom";

import styles from './index.module.css'

const Footer: FC = () => {

    return (
        <section className={styles.wrapper}>
            <Link to="/" className={`${styles.logo} crimson-text-regular`}>
                nitted.
            </Link>
            
            <Link to="https://kayastudio.pro" className={styles.kaya}>
                made by kaya
            </Link>
        </section>
    );
}

export default Footer;
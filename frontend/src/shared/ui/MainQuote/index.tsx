import { FC } from "react";

import styles from './index.module.css'

const MainQuote: FC = () => {
    
    return (
        <section className={styles.wrapper}>

            <p className={styles.title}>
                <span className="second-color">Мы продаём оригинальные брендовые вещи дёшево,</span> 
                <span className="main-color">чтобы свэг был доступен каждому.</span> 
                <span className="second-color">Убедитесь в этом сами.</span>
            </p>

            <div className={`${styles.subtitle} second-color`}>
                <p>nitted.</p>
                <p>2025</p>
                <p>swag<span className="aeroport">?</span></p>
            </div>

        </section>
    );
};

export default MainQuote;
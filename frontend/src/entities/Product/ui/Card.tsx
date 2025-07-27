import { FC, useState } from 'react';
import { ICard } from '../types/Card';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

const Card: FC<ICard> = ({
  data,
  className,
  customPlaceLeft,
  customPlaceRight,
  customPlaceTop,
  customPlaceBottom,
}) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  let customPlace: boolean = false;
  let customPlaceStyles: React.CSSProperties | undefined;
  if (className !== 'default') {
    customPlace = true;
    customPlaceStyles = {
      position: 'absolute',
      left: customPlaceLeft,
      right: customPlaceRight,
      top: customPlaceTop,
      bottom: customPlaceBottom,
    };
  }

  const imageUrl = isHovered && data.images[1] ? data.images[1] : data.images[0];

  return (
    <div
      onClick={() => navigate(`/product/${data._id}`)}
      className={`${styles.wrapper} ${className}`}
      style={customPlace ? customPlaceStyles : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={
          className == 'default'
            ? styles.imgPlaceDefault
            : className == 'mini'
              ? styles.imgPlaceMini
              : className == 'mid'
                ? styles.imgPlaceMid
                : className == 'large'
                  ? styles.imgPlaceLarge
                  : ''
        }
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <p
        className={`${
          className == 'default'
            ? styles.default_p
            : className == 'mini'
              ? styles.mini_p
              : className == 'mid'
                ? styles.mid_p
                : className == 'large'
                  ? styles.large_p
                  : ''
        } second-color`}
      >
        {data.name}
      </p>

      <p
        className={`${
          className == 'default'
            ? styles.default_p
            : className == 'mini'
              ? styles.mini_p
              : className == 'mid'
                ? styles.mid_p
                : className == 'large'
                  ? styles.large_p
                  : ''
        } main-color`}
      >
        {data.price}
        <span className="aeroport">$</span>
      </p>
    </div>
  );
};

export default Card;
//   {
//     "_id": "...",
//     "name": "Nike Air Max",
//     "brand": "Nike",
//     "images": ["/MaleCatalogPreview/item.png", "/MaleCatalogPreview/item2.png", /MaleCatalogPreview/item3.png],
//     "inStock": true,
//     "sizesEu": ["42", "43"],
//     "sizesUs": ["9", "10"],
//     "sizesMm": ["270", "280"],
//     "rating": 5,
//     "price": 1000,
//     "gender": "male",
//     "createdAt": "...",
//     "updatedAt": "..."
//   }

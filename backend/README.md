# Backend API документация

## Базовый URL

    http://localhost:5000/api/products

---

## Эндпоинты товаров

### Получить все товары
- **GET** `/api/products`
- **Ответ:** массив товаров

### Получить товар по id
- **GET** `/api/products/:id`
- **Ответ:** объект товара

### Добавить новый товар
- **POST** `/api/products`
- **Тело запроса:**
  ```json
  {
    "name": "Название",
    "brand": "Бренд",
    "images": ["url1", "url2"],
    "inStock": true,
    "sizesEu": ["42", "43"],
    "sizesUs": ["9", "10"],
    "sizesMm": ["270", "280"],
    "rating": 0
  }
  ```
- **Ответ:** созданный товар

### Изменить товар
- **PUT** `/api/products/:id`
- **Тело запроса:** (аналогично POST)
- **Ответ:** обновлённый товар

### Удалить товар
- **DELETE** `/api/products/:id`
- **Ответ:** `{ "message": "Product deleted" }`

### Увеличить рейтинг товара
- **POST** `/api/products/:id/increment-rating`
- **Ответ:** обновлённый товар с увеличенным rating

---

## Пример объекта товара
```json
{
  "_id": "...",
  "name": "Nike Air Max",
  "brand": "Nike",
  "images": ["https://..."],
  "inStock": true,
  "sizesEu": ["42", "43"],
  "sizesUs": ["9", "10"],
  "sizesMm": ["270", "280"],
  "rating": 5,
  "createdAt": "...",
  "updatedAt": "..."
}
``` 
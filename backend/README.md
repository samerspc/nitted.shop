# Backend API документация

## Базовый URL
    
    http://localhost:5001

---

## Эндпоинты товаров

### Получить все товары (с поддержкой сортировки и фильтрации по полу и бренду)
- **GET** `/api/products`
- **Параметры запроса (опционально):**
  - `sortBy` — поле для сортировки (`rating` или `price`)
  - `order` — порядок сортировки (`asc` или `desc`)
  - `gender` — фильтрация по полу (`male` или `female`)
  - `brand` — фильтрация по бренду (например, `Nike`)
- **Пример:**
  - `/api/products?sortBy=price&order=desc&gender=male&brand=Nike`
- **Ответ:** массив товаров

### Получить все бренды
- **GET** `/api/products/brands/all`
- **Ответ:** массив уникальных брендов (строки)

### Получить все размеры
- **GET** `/api/products/sizes/all`
- **Ответ:** объект с массивами всех уникальных размеров:
  ```json
  {
    "sizesEu": ["42", "43", ...],
    "sizesUs": ["9", "10", ...],
    "sizesMm": ["270", "280", ...]
  }
  ```

### Получить товар по id
- **GET** `/api/products/:id`
- **Ответ:** объект товара или 404 если не найден

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
    "rating": 0,
    "price": 1000,
    "gender": "male"
  }
  ```
- **Ответ:** созданный товар

### Изменить товар
- **PUT** `/api/products/:id`
- **Тело запроса:** (аналогично POST)
- **Ответ:** обновлённый товар или 404 если не найден

### Удалить товар
- **DELETE** `/api/products/:id`
- **Ответ:** `{ "message": "Product deleted" }` или 404 если не найден

### Увеличить рейтинг товара
- **POST** `/api/products/:id/increment-rating`
- **Ответ:** обновлённый товар с увеличенным rating или 404 если не найден

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
  "price": 1000,
  "gender": "male",
  "createdAt": "...",
  "updatedAt": "..."
}
``` 
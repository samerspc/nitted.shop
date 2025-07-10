```ruby
src/
├── app/                    # Точка входа в приложение
│   ├── index.tsx           # ReactDOM.render, провайдеры (Router, Redux, i18n и т.д.)
│   └── App.tsx             # Основной <App> с роутами
│
├── pages/                  # Страницы приложения (роуты)
│   ├── HomePage/           # например, главная страница
│   │   ├── index.tsx
│   │   └── HomePage.module.scss
│   ├── ProductPage/        # страница товара
│   └── CartPage/
│
├── features/               # Функциональные фичи, объединяющие логику и UI
│   ├── productList/        # загрузка списка товаров, пагинация
│   │   ├── ui/             # презентационные компоненты
│   │   ├── model/          # slice/RTK query/hooks
│   │   └── index.ts        # публичный API фичи
│   ├── productDetails/     # загрузка конкретного товара
│   ├── cart/               # добавление/удаление из корзины
│   └── checkout/           # оформление заказа
│
├── entities/               # Бизнес-сущности и их модели
│   ├── Product/            # типы, интерфейсы, классы-обёртки (domain-layer)
│   ├── User/               # авторизация, профиль
│   └── Order/
│
├── widgets/                # Переиспользуемые «комплекты» UI + логики
│   ├── Header/
│   ├── Footer/
│   ├── ProductCard/
│   └── CartPreview/        # мини-корзина в шапке
│
├── shared/                 # Общие утилиты, стили, константы
│   ├── api/                # клиент для запросов (axios/fetch), эндпоинты
│   ├── ui/                 # общие компоненты (Button, Modal, Spinner)
│   ├── lib/                # хелперы, форматтеры, валидаторы
│   ├── assets/             # изображения, шрифты
│   └── types/              # глобальные типы (Theme, RouteNames и т.д.)
│
└── store/                  # Redux Toolkit / Zustand / MobX и т. д.
    ├── index.ts
    └── rootReducer.ts
```

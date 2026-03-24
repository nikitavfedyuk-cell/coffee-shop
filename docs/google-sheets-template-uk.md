# Google Sheets Template

Нижче структура таблиці в простому вигляді для людини, яка буде оновлювати меню.

## Важливо

- Редагувати потрібно тільки 4 вкладки:
  - `site_settings`
  - `categories`
  - `menu_items`
  - `seo`
- Назви вкладок мають бути саме такими.
- Якщо у поточній таблиці є старі поля, яких немає в цьому документі, їх можна не використовувати.

## 1. site_settings

Ця вкладка має формат:

- `key`
- `value`
- `comment`

Тобто зліва ключ, посередині значення, справа пояснення для людини.

Потрібні ключі:

- `site_name`
- `site_language`
- `logo_url`
- `footer_eyebrow`
- `footer_title`
- `footer_address_label`
- `footer_hours_label`
- `footer_links_label`
- `address`
- `work_hours`
- `instagram_url`
- `telegram_url`
- `google_reviews_url`

Приклад:

| key | value | comment |
|---|---|---|
| site_name | Blue Date Coffee Shop | Назва закладу |
| site_language | uk | Мова сайту |
| logo_url | /menu-images/logo.png | Логотип у хедері, якщо потрібен |
| footer_eyebrow | Blue Date Coffee Shop | Малий підпис у нижньому блоці |
| footer_title | Дніпро. Чистий смак. Спокійний ритм. | Великий заголовок у нижньому блоці |
| footer_address_label | Адреса | Підпис для адреси |
| footer_hours_label | Години роботи | Підпис для графіка |
| footer_links_label | Посилання | Підпис для соцмереж та мапи |
| address | Дніпро, вул. Олеся Гончара 6 | Адреса |
| work_hours | Щодня 07:30-19:30 | Години роботи |
| instagram_url | https://instagram.com/... | Посилання на Instagram |
| telegram_url | https://t.me/... | Посилання на Telegram |
| google_reviews_url | https://maps.app.goo.gl/... | Посилання на Google Maps / Reviews |

Старі ключі, які сайт більше не використовує:

- `announcement_text`
- `hero_title_line_1`
- `hero_title_line_2`
- `hero_title_line_3`
- `hero_note`

Їх можна видалити з шаблону або просто більше не заповнювати.

## 2. categories

Це звичайна таблиця з колонками:

- `slug`
- `name_uk`
- `description_uk`
- `order`
- `is_active`

Пояснення:

- `slug` — короткий технічний ідентифікатор латиницею, без пробілів
- `name_uk` — назва категорії українською
- `description_uk` — короткий опис категорії
- `order` — порядок показу
- `is_active` — `TRUE` або `FALSE`

Приклад:

| slug | name_uk | description_uk | order | is_active |
|---|---|---:|---|
| coffee | Кава | Еспресо, молочні напої та чистий смак щодня. | 1 | TRUE |
| matcha | Матча | Матча у спокійному, чистому та збалансованому стилі. | 2 | TRUE |
| desserts | Десерти | Лаконічні десерти до кави. | 3 | TRUE |

## 3. menu_items

Це головна вкладка для оновлення меню.

Потрібні колонки:

- `id`
- `category_slug`
- `name_uk`
- `serving_uk`
- `description_uk`
- `price`
- `image_url`
- `badge`
- `is_active`
- `order`

Пояснення:

- `id` — унікальний номер або код позиції
- `category_slug` — має точно збігатися з `slug` з вкладки `categories`
- `name_uk` — назва позиції
- `serving_uk` — вихід напою або порції, наприклад `40 мл`, `160 мл`, `1 шт`
- `description_uk` — короткий опис
- `price` — тільки число, без `грн`
- `image_url` — шлях до картинки, наприклад `/menu-images/latte.png`
- `badge` — можна залишити пустим або вказати:
  - `new`
  - `cold`
  - `vegan`
  - `sold out`
- `is_active` — `TRUE` або `FALSE`
- `order` — порядок усередині категорії

Приклад:

| id | category_slug | name_uk | serving_uk | description_uk | price | image_url | badge | is_active | order |
|---|---|---|---|---:|---|---|---|---:|
| 1 | coffee | Flat White | 180 мл | Подвійний еспресо та шовковисте молоко | 120 | /menu-images/flat-white.png | new | TRUE | 1 |
| 2 | coffee | Americano | 160 мл | Еспресо з гарячою водою | 90 | /menu-images/americano.png |  | TRUE | 2 |

## 4. seo

Ця вкладка теж має формат:

- `key`
- `value`
- `comment`

Потрібні ключі:

- `meta_title`
- `meta_description`
- `og_title`
- `og_description`
- `og_image_url`
- `canonical_url`

Приклад:

| key | value | comment |
|---|---|---|
| meta_title | Blue Date Coffee Shop \| меню у Дніпрі | Title сторінки |
| meta_description | Кава, матча, десерти та сендвічі у Дніпрі. | Description |
| og_title | Blue Date Coffee Shop | Open Graph title |
| og_description | Меню кавʼярні Blue Date Coffee Shop | Open Graph description |
| og_image_url | /menu-images/og-cover.png | Open Graph image |
| canonical_url | https://your-domain.com | Canonical URL |

## Як оновлювати меню без помилок

- Додати нову категорію:
  - додати рядок у `categories`
- Додати нову позицію:
  - додати рядок у `menu_items`
  - перевірити, що `category_slug` збігається з реальною категорією
- Приховати позицію:
  - поставити `is_active = FALSE`
- Змінити порядок:
  - змінити `order`

## Як додавати фото

- Файл картинки кладеться в папку:
  - `public/menu-images`
- У таблиці в `image_url` треба писати:
  - `/menu-images/назва-файлу.png`

Приклад:

- файл:
  - `public/menu-images/matcha.png`
- у таблиці:
  - `/menu-images/matcha.png`

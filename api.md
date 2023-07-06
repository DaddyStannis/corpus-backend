# API

## FEEDBACK

### POST feedbacks/

Request:

```
{
  "name": string,
  "phone": string,
  "rating": number,
  "comment": string
}
```

Responses:

200:

```
{
  "name": string,
  "rating": number,
  "comment": string
}
```

### GET feedbacks/

Response:

```
[
  {
    "name": string,
    "rating": number,
    "comment": string
  }
]

```

## CATEGORY

### GET categories/

```
[
  {
    "name": string, // унікальне значення
    "quantity": number // кількість елементів цієї категорії
  }
]
```

### POST categories/

```
{
  "name": string
}
```

## PRODUCT SAMPLE

### GET product-samples/

```
query: page, limit, category
[
  {
    "name": string,
    "article": string,
    "price": number,
    "discountPrice": number
  }
]
```

### GET product-samples/<article>

```
{
  "article": string,
  "name": string,
  "price": number,
  "discountPrice": number,
  "colorList": array,
  "photos": array,
  "description": string,
  "category": string,
  "properties": {...} // властивості відповідні до обраної категорії
}
```

### POST product-samples/

Request:
Form data:

```
photos: binary,
{
  "article": string,
  "name": string,
  "price": number,
  "discountPrice": number, // необов'язково
  "colorList": array,
  "description": string,
  "category": string,
  "properties": {...}
}
```

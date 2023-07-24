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
  "message": "Feedback will be added after moderation"
}
```

### GET feedbacks/

Response:

```
[
  {
    "_id": string,
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
    "_id": string,
    "name": string,
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

### GET products/samples/ || GET products/

```
query: page, limit, category
{
  "total": number,
  "products": [
    {
      "_id": string,
      "name": string,
      "article": string,
      "price": number,
      "discountPrice": number
    }
  ]
}
```

### GET products/<id>

```
{
  "_id": string,
  "article": string,
  "name": string,
  "price": number,
  "discountPrice": number,
  "colorList": array,
  "description": string,
  "category": string,
  "sample": true,
  "photos": array,
  "properties": object,
  "createdAt": date,
  "updatedAt": date
}
```

### POST products/

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
  "sample": bool,
  "properties": {...}
}
```

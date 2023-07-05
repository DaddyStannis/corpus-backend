# API

## FEEDBACK

### POST feedbacks/

Request:

```
{
  "name": string,
  "phone": string,
  "comment": string
}
```

Responses:

200:

```
{
  "name": string,
  "comment": string
}
```

### GET feedbacks/

Response:

```
[
  {
    "name": string,
    "comment": string
  }
]

```

##

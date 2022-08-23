export const shoes = [
    {
      "id": 1,
      "name": "Mirror/Black",
      "originalPrice": 2800,
      "discount": 0,
      "price": 2800,
      "quantity": 4,
      "category": "Formal",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 4,
          "quantity": 10
        },
        {
          "size": 5,
          "quantity": 10
        },
        {
          "size": 6,
          "quantity": 10
        },
        {
          "size": 7,
          "quantity": 0
        },
        {
          "size": 8,
          "quantity": 4
        },
        {
          "size": 9,
          "quantity": 10
        }
      ],
      "fileName": "IMG-20220105-WA0004.jpg",
      "files": [
        "IMG-20220105-WA0004.jpg",
        "IMG-20220111-WA0003.jpg"
      ],
      "Ratings":5
    },
    {
      "id": 2,
      "name": "Mirror/White",
      "actualPrice": 1900,
      "discount": 0,
      "price": 1900,
      "quantity": 0,
      "category": "Sneaker",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220105-WA0005.jpg",
      "files": [
        "IMG-20220105-WA0005.jpg"
      ],
      "Ratings":5
    },
    {
      "id": 3,
      "name": "Signature LineUp/Black-Gold",
      "actualPrice": 2450,
      "discount": 450,
      "price": 2000,
      "quantity": 4,
      "category": "Sneaker",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220105-WA0006.jpg",
      "files": [
        "IMG-20220105-WA0004.jpg"
      ],
      "Ratings":5
    },
    {
      "id": 4,
      "name": "Biker Long/Green",
      "actualPrice": 1750,
      "discount": 0,
      "price": 1750,
      "quantity": 4,
      "category": "Boots",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220105-WA0007.jpg",
      "files": [
        "IMG-20220105-WA0007.jpg",
        "IMG-20220105-WA000B.jpg"
      ],
      "Ratings":5
    },
    {
      "id": 5,
      "name": "Biker Long/Black",
      "actualPrice": 1699,
      "discount": 0,
      "price": 1699,
      "quantity": 4,
      "category": "Boots",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220111-WA0000.jpg",
      "files": [
        "IMG-20220111-WA0000.jpg"
      ],
      "Ratings":4
    },
    {
      "id": 6,
      "name": "Mirror None/Black",
      "actualPrice": 1999,
      "discount": 0,
      "price": 1999,
      "quantity": 4,
      "category": "Street-Wear",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220111-WA0001.jpg",
      "files": [
        "IMG-20220111-WA0001.jpg"
      ],
      "Ratings":6
    },
    {
      "id": 7,
      "name": "Fantasia Printed",
      "actualPrice": 1250,
      "discount": 0,
      "price": 1250,
      "quantity": 4,
      "category": "Street-Wear",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220111-WA0002.jpg",
      "files": [
        "IMG-20220111-WA0002.jpg"
      ],
      "Ratings":2
    },
    {
      "id": 8,
      "name": "Mirror/Black",
      "actualPrice": 2400,
      "discount": 0,
      "price": 2400,
      "quantity": 4,
      "category": "Street-Wear",
      "description": "sdjsjj jdjjdj jjdhh jsjdjj du jjdu hjdjuj uhdjj uydhh jduu h",
      "sizes": [
        {
          "size": 6,
          "quantity": 1
        },
        {
          "size": 7,
          "quantity": 10
        },
        {
          "size": 8,
          "quantity": 4
        }
      ],
      "fileName": "IMG-20220111-WA0003.jpg",
      "files": [
        "IMG-20220111-WA0002.jpg"
      ],
      "Ratings":3
    }
  ]

  export const addShoeToDb = (shoe)=>{
      return shoes.push(shoe);
  }

  

 


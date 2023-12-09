## Name

Spa-test

## Description

Проєкт для перегляду різних картинок та їх обговорення в чаті в реальному часі

## Вимоги

PostgreSQL,Redis,Node.js,npm,docker,docker-compose.

## Installation

````bash
$ npm install`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
````

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Vitalii Kablukov](vetal.kablukov98@gmail.com)

## Приклади використання

Приклади та інструкції

##1 POST:http://localhost:3000/api/user
Body(json){
"email": "example@gmail.com",
"password":"111111"
}
result:{
"user": {
"email": "example@gmail.com",
"password": "$argon2id$v=19$m=65536,t=3,p=4$KMUZLM9wwttOpXNjtrXGDg$ZD9WK4u1GeyvRbCrqu96JBuhdeUA35mtZsVXdxafm1U",
"avatar": "",
"userName": "Anonymous",
"id": 17,
"createdAt": "2023-12-08T22:58:52.002Z",
"updatedAt": "2023-12-08T22:58:52.002Z",
"isActive": true
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNzAyMDc2MzMyLCJleHAiOjE3MDQ2NjgzMzJ9.rOtUG8IY57DxWnIEDW4mPDp4oaXZ1wZ2McbWCyfxPGg"
}

##2 POST:http://localhost:3000/api/auth/login
Body(json){
"email": "example@gmail.com",
"password":"111111"
}
result:{
"id": 17,
"email": "example@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE3MDIwNzY0ODEsImV4cCI6MTcwNDY2ODQ4MX0.7TuazovD5OCuTqfat7xqY1r8kB-IIl4J9KIacAaM9B4"
}

Приклад 1: Перегляд картинок
Запустіть сервер за допомогою команди npm run start:dev.
Відкрийте веб-браузер і перейдіть за посиланням http://localhost:3000.
Ви побачите головну сторінку.
Клацніть на Log in / Sign in, щоб зареєструватися та залогінитися.
Потім перейдіть на сторінку Pictures натиснувши на кнопку яка зявиться після логіна для перегляду картинок.
Приклад 2: Додавання коментарів
Перейдіть до сторінки з конкретною картинкою.
Використовуйте форму для додавання нового коментаря.
Напишіть свій коментар та відправте його.
Коментар з'явиться в розділі коментарів без перезавантаження сторінки.

## Статус проекту

**Розвиток**: Наразі проект знаходиться в стадії активної розробки. Відкриті до нових ідей та внесків.

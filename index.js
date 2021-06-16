// добавляем фреймворк express чтобы использовать объект express и его методы
// добавляем библиотеку mongoose чтобы использовать объект mongoose и его методы
// подключаем файл keys.js, чтобы был доступ к важным данным

// пишем просто require без присваивания значения переменной т.к. просто нужно, чтобы код в файлах выполнился
// код выполнится по порядку, так что, если сначала подключить passport, а потом Users, то Mongoose выведет ошибку:
// MissingSchemaError: Schema hasn't been registered for model "users". Use mongoose.model(name, schema)
// чтобы этого не было, подключим сначала файл User, в котором создается коллекция "users" и схема для нее (подробнее см. файл)
// подключаем файл passport.js (САМОПИСНЫЙ) в котором происходит аутентификация пользователя и занесение данных о пользователе в БД

// функция "mongoose.connect" для подключения библиотеки mongoose к базе данных mongoDB. 
// Взял данные для подключения здесь( https://cloud.mongodb.com/ ) и добавил данные в файл keys.js

// инициализируется серверное приложение express

// подключаем файл authRoutes.js, который использует библиотеку passport, чтобы обрабатывать маршруты
// и сразу же выполняем код внутри, поставив "app" внутри скоборк.
// Это выражение выполняет анонимную стрелочную функцию с аргументом "app",
// это возможно благодаря "module.exports = (app)..." (cм файл "authRoutes.js"),

// создаем константу, чтобы понимать на каком порте разместить сервер и следим за этим портом (слушаем его)
// ( locallhost:5000 или внутренняя константа окружения express которая, определит адрес, если мы сделаем деплой на Heroku )

// ________________________________________________________________________________________________________________________________ //

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser')

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json())
app.use(
	cookieSession({ // cookie config object
		maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie gonna live before it expires
		keys: [keys.cookieKey] // encryption keys, we dont want them to be commited so theyre locateed inside the "config/keys.js"
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === "production") {
	// express должен обслуживать файлы в продакшене, например main.js или main.css

	// express должен обслуживать файл index.html если он (экспресс) не распознает указанный путь
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
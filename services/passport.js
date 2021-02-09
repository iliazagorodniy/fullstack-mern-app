// комментарий *1
	// подключаем библиотеку passport.js ( упрощает аутентификацию пользователей ), чтобы использовать объект passport и его методы
// комментарий *2
	// подключаем отдельную библиотеку для аутентификации OAuth2.0 через сервисы гугл
// комментарий *3
	// добавляем библиотеку mongoose чтобы использовать объект mongoose и его методы
// комментарий *4
	// подключаем файл keys.js, чтобы был доступ к важным данным

// комментарий *5
	// Создаем объект пользователя, который создается по схеме, заданной в коллекции "users"

// комментарий *6
	// Использовать стратегию гугл для аутентификации создаем объект с моими данными указанными в сервисах гугл
	// и коллбэк, в котором прописыватся, что делать при аутентификации через стратегию гугл
// комментарий *7
	// (Посмотреть доки как работает GoogleStrategy) получили от гугла переменную profile с данными о профиле пользователя
	// аргумент "done" говорит о том, что процесс аутентификации завершен. Вызывем функцию done:
	// done(
		// errorObject - указывается если что-то пошло не по плану,
		// userRecord - указывает passport.js (либе) что пользователь создан, все круто и мы полностью закончили)
// комментарий *8
	// Используем класс User чтобы запустить запрос к базе монго. Будем искать среди всех записей в коллекции.
	// Нужно найти ОДНУ запись, где googleId === profile.id.
	// Любой запрос к БД — удаление добавление или изменение данных — происходит асинхронно,
	// а значит функция вернет промис как результат своего выполнения
// комментарий *9
	// "User({ googleId: profile.id }).save();" используется чтобы сохранить запись пользователя в подключенную базу данных

const passport = require('passport'); // комментарий *1
const GoogleStrategy = require('passport-google-oauth20').Strategy; // комментарий *2
const mongoose = require('mongoose'); // комментарий *3
const keys = require('../config/keys'); // комментарий *4

const User = mongoose.model('users'); // комментарий *5

passport.serializeUser((userModel, done) => {
	done(null, userModel.id)
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user)
		});
})

passport.use(
	new GoogleStrategy( // комментарий *6
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => { // комментарий *7
			const existingUser = await User.findOne({ googleId: profile.id })

			if (existingUser) {			// we already have a record with given profile id
				return done(null, existingUser);
			}

			const savedUser = await new User({ googleId: profile.id }).save() // комментарий *9
			done(null, savedUser)
		}
	)
);
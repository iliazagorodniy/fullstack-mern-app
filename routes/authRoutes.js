// подключаем библиотеку passport.js ( упрощает аутентификацию пользователей ), 
// чтобы использовать объект passport и его методы
// пишем "module.exports = (app) => {...}" (РАЗОБРАТЬСЯ КАК РАБОТАЮТ МОДУЛИ!!!), чтобы можно было выполнить этот код в другом файле
// принимаем аргумент app - объект express, наше серверное приложение 
	// и используем методы объекта express-приложения для обработки GET-запросов (получение данных) 
	// если пользователь еще не зашел в приложение через гугл, он отправляется на страницу гугла и входит через свой аккаунт

	// если пользователь зашел в приложение через гугл, 
	// его направляют обратно с полученными данными авторизации ( ID профиля ) от гугла

const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate(
			'google',
			{ scope: ['profile', 'email'] }
		)
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(request, response) => {
			response.redirect('/surveys')
		}
	);

	app.get(
		'/api/logout',
		(request, response) => {
			request.logout();
			response.redirect('/')
		}
	);

	app.get(
		'/api/current_user',
		(request, response) => {
			response.send(request.user);
		}
	);
};
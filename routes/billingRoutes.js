// stripe.charges.create возвращает промис,
// так что используем синтаксис async (ставим перед функцией, которая содержит асинхронный код)
// await (ставим перед вызовом функции который возвращает промис)

const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {
	app.post(
		'/api/stripe',
		requireLogin,
		async (request, response) => {
			const charge = await stripe.charges.create({
				amount: 500,
				currency: 'usd',
				description: '5$ for 5 credits',
				source: request.body.id,
			})

			// библиотека passport.js (настроили в файле index.js) автоматически сохраняет текущую модель пользователя в request.user
			request.user.credits += 5
			const user = await request.user.save()

			response.send(user)
		}
	)
}
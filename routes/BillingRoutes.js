const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey )

module.exports = (app) => {
	app.post('/api/stripe', (request, response) => {
		console.log(request.body)
	})
}
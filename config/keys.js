// здесь решаем какие АПИ ключи возвращать в зависимости от того, это продакшен или девелопмент это комиттим в гит

if (process.env.NODE_ENV === 'production') {
	// return prod keys
	module.exports = require('./prod');
} else {
	// return dev keys
	module.exports = require('./dev');
}
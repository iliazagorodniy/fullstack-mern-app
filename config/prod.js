// здесь храним важные данные для продакшена, которые хотим добавлять в систему контроля версий.

module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI:  process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY
}
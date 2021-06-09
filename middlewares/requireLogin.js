// request и response — те же объекты запроса и ответа с которыми мы работаем в authRoutes и billingRoutes
// next — callback-функция, вызываемая, когда наш middleware код полностью выполнился/завершился
module.exports = (request, response, next) => {
	if (!request.user) {
		return response.status(401).send({ error: "you must login to do that!" })
	}

	next();
}
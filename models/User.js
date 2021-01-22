// добавляем библиотеку mongoose чтобы использовать объект mongoose и его методы
// "const { Schema } = mongoose" === "const Schema = mongoose.Schema деструктурирующее присваивание

// Создаем объект класса Schema для отображения записей 
// (элементы базы данных представляющие отдельного пользователя) 
// в модели данных (коллекции) "users". В записи пока есть только уникальный для каждого пользователя googleId

// метод mongoose.model используется, чтобы 
// инициализировать модель данных (коллекцию) "users" и назначить для нее схему записей userSchema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

mongoose.model('users', userSchema);
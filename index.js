const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({hi: 'my name is Ilia! my app is here yea!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
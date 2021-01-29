// написать функцию которая делает аякс запрос и получает джейсон при помощи fetch

// https://swapi.dev/api/planets/

// function fetchPlanets() {
// 	fetch('https://swapi.dev/api/planets/')
// 		.then(res => res.json())
// 		.then(json => console.log(json));
// }

const fetchPlanets2 = async () => {
	const res = await fetch('https://swapi.dev/api/planets/');
	const json = await res.json();
	console.log(json);
}

fetchPlanets2();
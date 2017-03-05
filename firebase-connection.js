import Firebase from './src/firebase-init';

let db = Firebase.database();
let newsRef = db.ref('news');
let initialNews = require('./news.json');
let index = 0;

function setItemIntoBase() {
	if (index < initialNews.length) {
		let item = initialNews[index];
		item.date = (new Date(item.date)).toISOString();
		newsRef.push(item);
		index++;
	}
}

setInterval(setItemIntoBase, 2000);

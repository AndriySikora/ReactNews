import Firebase from './firebase-init';

const NewsData = Firebase.database().ref('news');

export default NewsData;

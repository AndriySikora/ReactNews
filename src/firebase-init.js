import Firebase from 'firebase';

// Initialize Firebase
const config = {
	apiKey: "AIzaSyD8_UCWRxRlQpgMsL61Ni9FlL0Ela_X0zg",
	authDomain: "reactnews-b0287.firebaseapp.com",
	databaseURL: "https://reactnews-b0287.firebaseio.com/",
	storageBucket: "reactnews-b0287.appspot.com",
	messagingSenderId: "99776768730"
};

Firebase.initializeApp(config);

export default Firebase;

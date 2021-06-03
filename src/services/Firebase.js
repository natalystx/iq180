import firebase from 'firebase/app'
import "firebase/firestore";

export default class FirebaseService{
  config 
  db
  
constructor(){
  this.config = {
    apiKey: "AIzaSyCmQf6LKoDznAL5rNrEwwEKKk3_Cf0tg_k",
    authDomain: "iq180-533fd.firebaseapp.com",
    databaseURL: "https://iq180-533fd.firebaseio.com",
    projectId: "iq180-533fd",
    storageBucket: "iq180-533fd.appspot.com",
    messagingSenderId: "859529052304",
    appId: "1:859529052304:web:705e8eef5a33c884b2d815",
    measurementId: "G-3YYVK561FH"
  };
  }

  initialize(){
    this.db = firebase.initializeApp(this.config)
  }

  async getData(){
  
  let res 
   const data = this.db.firestore().collection('visitor').doc('visit')
  await data.get().then(data => {
    if (data.exists) {
        res =  data.data()
    } else {       
        console.log("No such document!");
    }
  })

  

  return res
  }

  setData(count){
    const data = this.db.firestore().collection('visitor').doc('visit')
    data.set({
      count: count
    })

  
  }
}
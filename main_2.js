//ADD YOUR FIREBASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyCGbBrH17txWa7VQKQAzFPKtTuvSdK9aAg",
  authDomain: "kwitter-app-homework.firebaseapp.com",
  databaseURL: "https://kwitter-app-homework-default-rtdb.firebaseio.com",
  projectId: "kwitter-app-homework",
  storageBucket: "kwitter-app-homework.appspot.com",
  messagingSenderId: "1019848816019",
  appId: "1:1019848816019:web:4dcb2b7ef05def36c72466"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");

document.getElementById("welcome").innerHTML = "Welcome " + username + "!";

function addRoom() {

    room_name = document.getElementById("new_room").value; 

    firebase.database().ref("/").child(room_name).update({
       purpose: "adding room"
    });

    localStorage.setItem("room name", room_name);

    window.location = "index_3.html";

    document.getElementById("new_room").value="";
}

function getData() {

firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot){childKey  = childSnapshot.key;
Room_names = childKey; 

console.log("Room Name - " + Room_names);

row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoom(this.id)'>#" + Room_names + "</div><hr>";

document.getElementById("output").innerHTML += row;

});});}

getData();

function redirectToRoom(name) {

     console.log(name);
     localStorage.setItem("room_name", name);
     window.location = "index_3.html";

}

function logout() {

     localStorage.removeItem("username");
     localStorage.removeItem("room_name");
     localStorage.removeItem("room name");
     window.location = "index.html";
}



    

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
  room_name = localStorage.getItem("room name");

  function send() {
      
     text = document.getElementById("input_text").value;

     firebase.database().ref(text).push({
        like: 0 ,
        msg: text , 
        name: username  
     });

     document.getElementById("input_text").innerHTML="";
  }

  
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    name_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'</h4>";
    text_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
    like_button = "<button class = 'btn btn-warning' id = '" + firebase_message_id + "' value = '" + like + "' onclick = 'updateLike(this.id)'>"
    span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like:" + like + "</span></button>";

    row = name_tag + text_tag + like_button + span_tag;
    document.getElementById("messaging").innerHTML += row;
    } });  }); }
getData();

function updateLike(message_id) {
        console.log(message_id);
        button_id =  message_id;
        likes = document.getElementById(button_id).value;
        updatedLikes = Number(likes) + 1;
        console.log(updatedLikes);

        firebase.database().ref(room_name).child(button_id).update({
              like: updatedLikes
        })
}

function logout() {

    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    localStorage.removeItem("room name");
    window.location = "index.html";
}


/*
document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app;

    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');

    myPost.onSnapshot(doc => {
        const data = doc.data();
        document.querySelector('#title').innerHTML = data.title;
    })


});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            document.write('Hello ', user.displayName);
            console.log(user)
        })
        .catch(console.log);
}

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title: e.target.value})
}
*/



// Firebase configuration

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBoYD_z4F0uGi9VLq8ES4Nl_yB06LckNS8",
    authDomain: "board-game-manager-14695.firebaseapp.com",
    projectId: "board-game-manager-14695",
    storageBucket: "board-game-manager-14695.appspot.com",
    messagingSenderId: "1044140598020",
    appId: "1:1044140598020:web:1480e227e87f088969a651",
    measurementId: "G-EWJLJYC2FC"
  }


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the table body
const tableBody = document.getElementById('boardGamesTable').getElementsByTagName('tbody')[0];

// Function to render data
function renderTable(doc) {
    let row = tableBody.insertRow();
    let name = row.insertCell(0);
    let gameLength = row.insertCell(1);
    let numberOfPlayers = row.insertCell(2);
    let status = row.insertCell(3);
    let location = row.insertCell(4);
    let extension = row.insertCell(5);
    let loanable = row.insertCell(6);

    let control = row.insertCell(7);

    name.textContent = doc.data().name;
    gameLength.textContent = doc.data().gameLength;
    numberOfPlayers.textContent = doc.data().maxPlayers;
    status.textContent = doc.data().status;
    location.textContent = doc.data().location;
    extension.textContent = doc.data().extension;
    loanable.textContent = doc.data().loanable;
 
    let editButton = document.createElement('button');
    editButton.id = 'edit-' + doc.id;
    editButton.className = 'btn btn-primary ms-3';
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#actionModal');
    editButton.textContent = 'Edit';

    control.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.id = 'delete-' + doc.id;
    deleteButton.className = 'btn btn-danger ms-3';
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#actionModal');
    deleteButton.textContent = 'Delete';

    control.appendChild(deleteButton);
    
}

let modalCloseBtn = document.getElementById('modalCloseBtn');
let actionLabel 
let actionBtn = 
let modal

db.collection('Items').onSnapshot(snapshot => {
    // Clear the table
    tableBody.innerHTML = '';
    snapshot.forEach(doc => {
        renderTable(doc);
    });
});
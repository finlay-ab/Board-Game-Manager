// Import Firestore instance from common-init.js
import { db } from './common-init.js';
import { isAdmin } from './app.js';
import { doc, collection, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Reference to the table body
const tableBody = document.getElementById('boardGamesTable').getElementsByTagName('tbody')[0];
let userBorrowList = [];

// Function to render data
function renderTable(doc) {
    let row = tableBody.insertRow();
    let borrow = row.insertCell(0);
    let name = row.insertCell(1);
    let gameLength = row.insertCell(2);
    let numberOfPlayers = row.insertCell(3);
    let status = row.insertCell(4);
    let location = row.insertCell(5);
    let extension = row.insertCell(6);
    let loanable = row.insertCell(7);


    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.style.width = "100%";
    checkbox.style.height = "100%";
    checkbox.style.display = "block";
    checkbox.style.margin = "0";
    checkbox.id = "checkbox-" + doc.id;

    console.log(doc.data().loanable + " -- " + typeof doc.data().loanable);
    if (doc.data().loanable == false)
    {
        checkbox.disabled = true;
    }

    checkbox.addEventListener('click', AddToBorrowList);
    borrow.appendChild(checkbox);
    

    name.textContent = doc.data().name;
    gameLength.textContent = doc.data().gameLength;
    numberOfPlayers.textContent = doc.data().maxPlayers;
    status.textContent = doc.data().status;
    location.textContent = doc.data().location;
    extension.textContent = doc.data().extension;
    loanable.textContent = doc.data().loanable;

}

const AddToBorrowList = (event) => {
    var targetId = (event.target.id.length > 1) ? event.target.id : event.target.parentElement.id;
    let itemId = targetId.split('-')[1];

    // Check if the checkbox is checked or not
    if (event.target.checked) {
        // Add item to the list if it's not already in the list
        if (!userBorrowList.includes(itemId)) {
            userBorrowList.push(itemId);
        }
    } else {
        // Remove item from the list if it is unchecked
        userBorrowList = userBorrowList.filter(id => id !== itemId);
    }

    console.log(userBorrowList); // To see the current list
};


onSnapshot(collection(db, 'Items'), (snapshot) => {
    // Clear the table
    tableBody.innerHTML = '';
    snapshot.forEach(doc => {
        renderTable(doc);
    });
});

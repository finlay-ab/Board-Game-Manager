// Import Firestore instance from common-init.js
import { db } from './common-init.js';
import { doc, collection, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
    editButton.addEventListener('click', LoadModal);
    editButton.textContent = 'Edit';

    control.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.id = 'delete-' + doc.id;
    deleteButton.className = 'btn btn-danger ms-3';
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#actionModal');
    deleteButton.addEventListener('click', LoadModal);
    deleteButton.textContent = 'Delete';

    control.appendChild(deleteButton);

    document.getElementById("add-0").addEventListener("click", LoadModal);
}

let modalCloseBtn = document.getElementById('modalCloseBtn');
let actionModalLabel = document.getElementById('actionModalLabel');
let actionBtn = document.getElementById('actionBtn');
let modName = document.getElementById('modName');
let modGameLength = document.getElementById('modGameLength');
let modMaxPlayers = document.getElementById('modMaxPlayers');
let modStatus = document.getElementById('modStatus');
let modLocation = document.getElementById('modLocation');
let modExtension = document.getElementById('modExtension');
let modLoanable = document.getElementById('modLoanable');
let addBtn = document.getElementById('add-0');

const LoadModal = (event) => {
    var targetId = (event.target.id.length > 1) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1];
    window.selectedIndex = selectedIndex;

    // Remove any existing event listeners to avoid multiple calls
    actionBtn.removeEventListener('click', AddData);
    actionBtn.removeEventListener('click', EditData);
    actionBtn.removeEventListener('click', DeleteData);

    if (mode === 'add') {
        actionBtn.className = 'btn btn-lg btn-success';
        actionBtn.innerText = 'Add';
        actionModalLabel.innerText = 'Add new item';
        actionBtn.addEventListener('click', AddData);

        modName.value = "";
        modGameLength.value = "";
        modMaxPlayers.value = "";
        modStatus.value = "";
        modLocation.value = "";
        modExtension.value = "";
        modLoanable.value = "";

        modName.disabled = false;
        modGameLength.disabled = false;
        modMaxPlayers.disabled = false;
        modStatus.disabled = false;
        modLocation.disabled = false;
        modExtension.disabled = false;
        modLoanable.disabled = false;
    } else if (mode === 'edit') {
        actionBtn.className = 'btn btn-lg btn-success';
        actionBtn.innerText = 'Save';
        actionModalLabel.innerText = 'Edit item';
        actionBtn.addEventListener('click', EditData);

        const docRef = doc(db, 'Items', selectedIndex);

        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                modName.value = doc.data().name;
                modGameLength.value = doc.data().gameLength;
                modMaxPlayers.value = doc.data().maxPlayers;
                modStatus.value = doc.data().status;
                modLocation.value = doc.data().location;
                modExtension.value = doc.data().extension;
                modLoanable.value = doc.data().loanable;
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        modName.disabled = false;
        modGameLength.disabled = false;
        modMaxPlayers.disabled = false;
        modStatus.disabled = false;
        modLocation.disabled = false;
        modExtension.disabled = false;
        modLoanable.disabled = false;
    } else if (mode === 'delete') {
        actionBtn.className = 'btn btn-lg btn-danger';
        actionBtn.innerText = 'Delete';
        actionModalLabel.innerText = 'Delete item';
        actionBtn.addEventListener('click', DeleteData);

        const docRef = doc(db, 'Items', selectedIndex);

        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                modName.value = doc.data().name;
                modGameLength.value = doc.data().gameLength;
                modMaxPlayers.value = doc.data().maxPlayers;
                modStatus.value = doc.data().status;
                modLocation.value = doc.data().location;
                modExtension.value = doc.data().extension;
                modLoanable.value = doc.data().loanable;
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        modName.disabled = true;
        modGameLength.disabled = true;
        modMaxPlayers.disabled = true;
        modStatus.disabled = true;
        modLocation.disabled = true;
        modExtension.disabled = true;
        modLoanable.disabled = true;
    } else {
        console.log(mode);
    }
};

const AddData = () => {
    console.log(modName.value);
    addDoc(collection(db, 'Items'), {
        name: modName.value,
        gameLength: modGameLength.value,
        maxPlayers: modMaxPlayers.value,
        status: modStatus.value,
        location: modLocation.value,
        extension: modExtension.value,
        loanable: modLoanable.value
    }).then(() => {
        console.log("Document successfully written!");
        actionBtn.disabled = false;
        modalCloseBtn.click();
    }).catch((error) => {
        console.error("Error writing document: ", error);
        actionBtn.disabled = false;
    });
};

const EditData = () => {
    const docRef = doc(db, 'Items', window.selectedIndex);

    updateDoc(docRef, {
        name: modName.value,
        gameLength: modGameLength.value,
        maxPlayers: modMaxPlayers.value,
        status: modStatus.value,
        location: modLocation.value,
        extension: modExtension.value,
        loanable: modLoanable.value
    }).then(() => {
        console.log("Document successfully updated!");
        actionBtn.disabled = false;
        modalCloseBtn.click();
    }).catch((error) => {
        console.error("Error updating document: ", error);
        actionBtn.disabled = false;
    });
};

const DeleteData = () => {
    const docRef = doc(db, 'Items', window.selectedIndex);

    deleteDoc(docRef).then(() => {
        console.log("Document successfully deleted!");
        actionBtn.disabled = false;
        closeModal();
    }).catch((error) => {
        console.error("Error deleting document: ", error);
        actionBtn.disabled = false;
        modalCloseBtn.click();
    });
};

onSnapshot(collection(db, 'Items'), (snapshot) => {
    // Clear the table
    tableBody.innerHTML = '';
    snapshot.forEach(doc => {
        renderTable(doc);
    });
});

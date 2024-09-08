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

var database = firebase.database().ref().child('Tasks');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var TaskTitle = snapshot.val().TaskTitle;
        var JobId= snapshot.val().JobId;

        snapshot.forEach(function(data){
        });

        content = '<tr>';
        content += '<td>' + TaskTitle + '</td>'; //column1
        content += '<td>' + JobId + '</td>';//column2
        content += '</tr>';
    }

    $('#ex-table').append(content);
    console.log(snapshot.val());
});
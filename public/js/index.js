import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDEYOIh223tYGDltukeOS8m0gXCbo6st2s",
  authDomain: "spending-tracker-acb67.firebaseapp.com",
  projectId: "spending-tracker-acb67",
  storageBucket: "spending-tracker-acb67.appspot.com",
  messagingSenderId: "1027464487480",
  appId: "1:1027464487480:web:77b522dd28218a108abccd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#loginBtn").onclick = login;
    document.querySelector("#joinBtn").onclick = join;
});

const login = async () => {
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(`userId: ${user.uid}`)
        $.ajax({
            async: true,
            url: `https://expense-tracker-springboot-api.herokuapp.com/user/${user.uid}`,
            type: 'GET',
            success: function(data, responseText, jqXHR){
                alert(data)
                sessionStorage.setItem("userId", data.id);
                window.location.replace('./html/spend.html');

            }, 
            error: function(error){
                console.log('user not inserted')
                console.log(error)
            
            }
        })
    
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

const join = async () => {
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        $.ajax({
            async: true,
            url:'https://expense-tracker-springboot-api.herokuapp.com/user',
            contentType: 'application/json',
            data: JSON.stringify({uid: user.uid}),
            type: 'POST',
            success: function(data){
                sessionStorage.setItem("userId", data.id);
                window.location.replace('./html/spend.html');
            }, 
            error: function(error){
                console.log('user not inserted')
                console.log(error)
                .deleteUser(user.uid)
                .then(() => {
                    console.log('Successfully deleted user');
                })
                .catch((error) => {
                    console.log('Error deleting user:', error);
                });

            }
        })
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ..
    });

}


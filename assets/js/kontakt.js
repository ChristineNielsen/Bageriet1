
const button = document.getElementById('send');

button.onclick = function() {
    //Tjek felt firstname
    const firstname = document.getElementById('firstname');
    if(firstname.value === '') { //Translated; "If the value of First Name = nothing"
        alert('Feltet navn må ikke være tomt!'); //Makes an pop-up alert thing
        firstname.focus(); //Makes a little blue border around the input area
        return false; //Stops the validation from immediately going down to the next thing,
        //so that the user has a chance to change their mistake first 
    }

    const email = document.getElementById('email');
    if(email.value === '') {
        alert('Feltet E-mail adresse må ikke være tomt!');
        email.focus();
        return false;
    }

    
    const comment = document.getElementById('comment');
    if(comment.value === '') {
        alert('Feltet Kommentar må ikke være tomt!');
        comment.focus();
        return false;
    }

  alert('Formularen blev afsendt!');
}
document.getElementById('login').onclick = login();
  
function login() {
  //Sætter headers
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  
  let urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);
  
  //Sætter Request Options
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  //Fetcher endpoint med requestOptions
  fetch("https://api.mediehuset.net/token", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.access_token) {
        //console.log(result);

        // Smider token og bruger id i session storage      
        sessionStorage.setItem('token', result.access_token);
        sessionStorage.setItem('user_id', result.user_id);
      }
  })
  .catch(error => console.log('error', error));
}

//Måler på om folk er logget ind
if(sessionStorage.getItem('token')) {
  //Hvis denne er sat er man logget ind...
  console.log('Du er logget ind!');
} else {
  //Skal man have et login vindue
  console.log('Du er IKKE logget ind!');
}


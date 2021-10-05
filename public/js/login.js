// async function isLoggedIn() {
//     let jwt = localStorage.getItem('jwt');
    
//     if (!jwt) {
//         return false;
//     } 

//     let options = {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${jwt}`,
//         },
//     }
    
//     fetch('http://localhost:3000/jwtAuth', options)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             console.log('data', data)
//             location.href = 'http://localhost:3000/welcome'
//         })
//         .catch(error => {
//             console.log('error: ', error)
//         })

// }

// async function redirectIfLoggedIn() {
//     const isAlreadyLoggedIn = await isLoggedIn()
    
//     if (isAlreadyLoggedIn) {
//         location.href = 'http://localhost:3000/welcome'
//     }
// }

// redirectIfLoggedIn();

document.getElementById('loginButton').onclick = function () {
    const username = document.getElementById('username').value
    const password = document.getElementById('pass').value
    console.log('username: ', username)
    console.log('password: ', password)

    let body = {
        username: username,
        password: password
    }

    async function postLogin(url = '', data = {}) {
        // Default options are marked with *

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'

          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response// parses JSON response into native JavaScript objects
    }
      
    postLogin('http://localhost:3000/login', body)
        .then(data => {
            window.location.href = data.url;
            console.log('[response after POSTing to /login]', data)
        })
        .catch(error => {
            console.log('[error]: ', error)
        })
    
}
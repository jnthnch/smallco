
function checkForChookie() {
    
}

checkForCookie()

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
//     } else {
//         location.href = 'http://localhost:3000/login'
//     }
// }

// redirectIfLoggedIn();
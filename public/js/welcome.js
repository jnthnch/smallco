async function getUsername() {
    // console.log('[cookie]: ', document.cookie)
    let username = document.cookie.username;

    // console.log('document.cookie', document.cookie)
    // console.log('username!!!', username)
    let cookieInArray = document.cookie.split('; ');

    // console.log('cookie array', cookieInArray)
    // console.log('cookie array length', cookieInArray.length)
    for (let i = 0; i < cookieInArray.length; i++) {
        let currentValue = cookieInArray[i];
        let valueSplit = currentValue.split("=")
        let key = valueSplit[0]
        let value = valueSplit[1]
        if (key === "username") {
            username = value
        }
    }

    let textnode = document.createTextNode(username);

    console.log('textnode', textnode)

    document.getElementById('welcome-username').appendChild(textnode);

}

document.getElementById('logout-button').onclick = async function () {
    async function logout(url) {
        const response = await fetch(url, {
            method: 'POST'
        });
    
        return response
    }

    logout('http://localhost:3000/logout')
        .then(data => {
            console.log('[response after logout]', data)
            location.href = '/login'
        })
}

axios.get('http://localhost:5000/games')
    .then(function (response) {
        console.log('games response:', response.data)
    })
    .catch(function (error) {
        console.log('[error]: ', error)
    })

getUsername();
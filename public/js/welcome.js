async function getUsername() {
    let username = document.cookie.username;
    let cookieInArray = document.cookie.split('; ');

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

    document.getElementById('welcome_username').appendChild(textnode);
}

document.getElementById('logout_button').onclick = async function () {
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

function handleSubmit() {
    let selection = document.getElementById('game-1-selection')
    console.log('selection: ', selection.value)
    console.log('handle submit clicked')
}

getUsername();
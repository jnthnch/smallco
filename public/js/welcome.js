function init() {
    getUsername();
    fetchGames();

}

function fetchGames() {
    axios.get('http://localhost:5000/games')
        .then(function (response) {
            let gamesArray = response.data;
            for (let i = 0; i < gamesArray.length; i++) {
                addGame(gamesArray[i])
            }
        })
        .catch(function (error) {
            console.log('[error]: ', error)
        })
}

function addGame(game) {
    const gamePicksContainer = document.getElementsByClassName('game_picks_container')
    const gamePick = document.createElement('game-pick')

    gamePick.addEventListener('jonEvent', function (event) {
        console.log('it works!!!')
        console.log('event', event.detail)
    })

    const { homeTeam, awayTeam, homeSpread, awaySpread } = game;

    console.log('[game]', game)
    // console.log('gamePicksContainer', gamePicksContainer)

    gamePick.setAttribute('team-home-name', homeTeam)
    gamePick.setAttribute('team-away-name', awayTeam)
    gamePick.setAttribute('team-home-spread', homeSpread)
    gamePick.setAttribute('team-away-spread', awaySpread)

    gamePicksContainer[0].appendChild(gamePick)
    // console.log('game: ', game)
}

function getUsername() {
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


// function handleSubmit() {
//     let selection = document.getElementById('game-1')
//     console.log('selection: ', selection)
//     console.log('handle submit clicked')
// }

init();
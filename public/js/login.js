document.getElementById('loginButton').onclick = function () {
    const username = document.getElementById('username').value
    const password = document.getElementById('pass').value

    let body = {
        username: username,
        password: password
    }

    async function postLogin(url = '', data = {}) {

        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(data)
        });

        return response
    }
      
    postLogin('http://localhost:3000/login', body)
        .then(data => {
            if (data.status === 401) {
                alert('username or password is incorrect')
            } else {
                window.location.href = data.url;
            }
        })
    
}
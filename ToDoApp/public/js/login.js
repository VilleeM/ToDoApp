function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    axios.post('/api/login', {
        username: username,
        password: password
    })
        .then(function (response) {
            axios.get('/todo')
                .then(function (response) {
                    location.href = '/todo';
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            location.href = `login?error=${error.response.data}`;
        });
}

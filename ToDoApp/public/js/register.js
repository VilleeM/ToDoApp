function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmpassword").value;

    if (password !== confirmpassword) {
        location.href = `register?error=Passwords don't match!`
        return false;
    }

    axios.post('/api/users', {
        username: username,
        password: password
    })
        .then(function (response) {
            location.href = '/todo';
        })
        .catch(function (error) {
            location.href = `register?error=${error.response.data}`;
        });

}


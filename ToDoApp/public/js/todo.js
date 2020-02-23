function logout() {
    document.cookie = `jwtToken=''`;
    location.href = '/login';
}

function modifyTodo(todo) {
    const {_id, content, done} = todo;

    axios.put(`/api/user/todo/${_id}`, {
        content: content,
        done: !done
    })
        .then(function (response) {
            axios.get('/todo')
                .then(function (response) {
                    location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
}


function createTodo() {
    const content = document.getElementById("todo-content").value;

    if (!content) {
        return;
    }

    axios.post('/api/user/todo', {
        content: content,
        done: false
    })
        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {

        });

}


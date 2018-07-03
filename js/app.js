
const github = new Github();
const ui = new UI();
const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup', (e) => {
    const userText = e.target.value;

    if (userText !== '') {
        let userProfile;
        ui.showPreloader();
        github.getUser(userText)
            .then(user => {
                if (user.message === 'Not Found') {
                    ui.showAlert(`User: ${userText} not found`, 'alert alert-danger');
                    ui.clearProfile();
                } else {
                    ui.clearAlert();
                }
                userProfile = user;
                return user;
            })
            .then(user => github.getRepos(user))
            .then(repos => {
                ui.showProfile(userProfile);
                ui.showRepos(repos);
            })
            .catch(err => {
                console.log(err);
                ui.clearProfile();
            })
    } else{
        ui.clearProfile();
    }
});



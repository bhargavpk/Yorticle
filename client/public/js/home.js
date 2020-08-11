const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
if(loginForm || signupForm)
{
    const buttonList = Array.from(document.getElementsByClassName('account-nav-ele'))
    const loginButton = buttonList[0];
    const signupButton = buttonList[1];

    loginButton.addEventListener('click', e => {
        signupForm.classList.remove('show-form');
        loginForm.classList.add('show-form');
    })

    signupButton.addEventListener('click', e => {   
        loginForm.classList.remove('show-form');
        signupForm.classList.add('show-form');
    })
}
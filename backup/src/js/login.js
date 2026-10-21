const container = document.querySelector('.login-container')
const registerbtn = document.querySelector('.btn-register')
const loginbtn = document.querySelector('.btn-login.kanan')

registerbtn.addEventListener('click', () =>{
    container.classList.add('active')
});

loginbtn.addEventListener('click', () =>{
    container.classList.remove('active')
});
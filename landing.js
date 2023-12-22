// landing.js// 
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    var username = document.getElementById('username').value
    sessionStorage.setItem('username',username); 

    var difficulty = document.getElementById('difficulty').value;

    switch (difficulty) {
        case 'easy':
            window.location.href = 'easy.html'; 
            break;
        case 'medium': 
            window.location.href = 'medium.html';
            break;
        case 'hard':
            window.location.href = 'hard.html';
            break;
        default:
            break;
    }
}); 






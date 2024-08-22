let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}
// Typing Text code 
const typed = new Typed('.multiple-text', {
    strings: ['<i>Web Developer</i>.', 'Frontend Developer.', 'Backend Developer.', 'Web Designer', 'Software Developer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
});



//about page code
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbwtWi4xGFhPkrmWn7qNxzmK8ISySLd68rc8svOIyMCw_yI8lt76h7K1_vObwr2rfAK0iQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById ('msg')

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },4000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})
let name = ''
if (!localStorage.name) {
    name = prompt('Ваше имя')
    localStorage.setItem('name', name)
}

name = localStorage.name

const socket = io({
    query: {
        user: name
    }
});

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const userName = document.getElementById('userName');
const contact = document.getElementById('contact');

userName.innerText = name;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {text: input.value, name});
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    const item = `<div class="${msgText(msg)}"><div class="img_cont_msg">
                            <img src="${msgImage(msg)}" class="rounded-circle user_img_msg">
                        </div>
                        <div class="msg_cotainer">
                            ${msg.text}
                            <span class="msg_time">${msg.name}</span>
                        </div></div>`;
    messages.innerHTML += item;
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user act', (users) => {
    contact.innerHTML = ''
    users.forEach(user => {
        contact.innerHTML += userRen(user)
    })
})

function msgText(msg) {
    let color = 'd-flex justify-content-start mb-4'
    if (msg.name === name) {
        color = 'd-flex justify-content-end mb-4'
    }
    return color
}

function msgImage(msg) {
    let image = '.img/user_2.jpg'
    if (msg.name === name) {
        image = '.img/user_1.jpg'
    }
    return image
}

function userRen(item) {
    const res = `
                <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="./img/user_1.jpg" class="rounded-circle user_img">
                        <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                        <span>${item.user}</span>
                        <p>Sami is online</p>
                    </div>
                </div>
            </li>`
    return res
}
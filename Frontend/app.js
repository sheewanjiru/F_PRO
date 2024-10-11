async function registerUser() {
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert('Registration failed! Please try again');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
    // alert('Registered successfully')
}


async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/register', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username, password})
    });
}
async function loadEvents() {
    const eventName =document.getElementById('event-name').value;
    await fetch ('http://localhost:5000?create event',{
        method:'POST',
        headers:{'Content=Type':'application/json'},
        body: JSON.stringify({eventName})
    });
    loadEvents();
}

async function getEvents(){
    const response = await fetch('http://localhost:5000/events');
    const events = await response.json();
    const eventList = document.getElementById('event-list');
    eventList.innetHTML ='';
    events.forEach(event => {
        const li =document.createElement('li');
        li.textContent = event.name;
        eventList.appendChild(li);
    });
}

//Real-time chat
const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('Connected to chat server');
});
socket.on('chat message', function (msg){
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
});

function sendMessage() {
    const message =document.getElementById('chat-message').value;
    socket.emit('chat message', message);
    document.getElementById('chat-message').value ='';
}
// Run this when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'User'; 
    document.getElementById('username').textContent = username;

    // Fetch upcoming events
    fetchUpcomingEvents();
});


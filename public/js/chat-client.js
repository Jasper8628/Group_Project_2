/**
 *  This is imported into the client html to provide socket.io connectivity
 *  Why doesn't any of this need to be in document.ready?
 */

const socket = io('http://localhost:3000')
//const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage (message) {
  // const messageElement = document.createElement('div')
  // messageElement.innerText = message
  // messageContainer.append(messageElement)
  const messageText = $('#chat-flash-message')
  messageText.innerText = message
  messageText.slideDown('fast')
  setTimeout(() => {
    messageText.slideUp('slow')
  }, 3000)
}

/**
 *  This is imported into the client html to provide socket.io connectivity
 *  Why doesn't any of this need to be in document.ready?
 */

const socket = io.connect('https://project2-chessgame.herokuapp.com/')
const messageContainer = document.getElementById('chatHistory')
const messageForm = document.getElementById('chatContainer')
const messageInput = document.getElementById('messageInput')
const name = document.getElementById('hdbusername').textContent

appendMessage(`Hi ${name} thanks for joining the game`)
console.log(`%c chat-client.js -> Good news [${name}] you joined the game`, 'background: #0000FF; color: #FFFFFF;')

socket.emit('new-user', name)

socket.on('chat-message', data => {
  try {
    console.log(`%c chat-client.js -> Good news you got a chat message ${data.message}`, 'background: #0000FF; color: #FFFFFF;')
    appendMessage(`${data.name}: ${data.message}`)
  } catch (error) {
    console.log('%c chat-client.js -> EXCEPTION ON CHAT-MESSAGE', 'background: #FF0000; color: #FFFFFF;')
  }
})

socket.on('user-connected', name => {
  try {
    console.log(`%c chat-client.js -> Good news the user ${name} connected`, 'background: #0000FF; color: #FFFFFF;')
    appendMessage(`${name} connected`)
  } catch (error) {
    console.log('%c chat-client.js -> EXCEPTION ON CONNECT', 'background: #FF0000; color: #FFFFFF;')
  }
})

socket.on('user-disconnected', name => {
  try {
    console.log(`%c chat-client.js -> Good news the user ${name} disconnected`, 'background: #0000FF; color: #FFFFFF;')
    appendMessage(`${name} disconnected`)
  } catch (error) {
    console.log('%c chat-client.js -> EXCEPTION ON DISCONNECT', 'background: #FF0000; color: #FFFFFF;')
  }
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  console.log(`%c chat-client.js -> Good news you submitted the form with ${message}`, 'background: #0000FF; color: #FFFFFF;')
  appendMessage(`You said: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage (message) {
  try {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    console.log(`%c chat-client.js -> APPENDING MESSAGE [${message}]`, 'background: #0000FF; color: #FFFFFF;')
  } catch (error) {
    console.log('%c chat-client.js -> EXCEPTION ON APPEND', 'background: #FF0000; color: #FFFFFF;')
  }
}

// $("#logout").on('click', function (event) {
//   event.preventDefault()
//   window.location.replace('/')

// })

// const messageText = $('#chat-flash-message')
// messageText.innerText = message
// messageText.slideDown('fast')
// setTimeout(() => {
//   messageText.innerText = ''
//   messageText.slideUp('slow')
// }, 3000)

// if (name === undefined) {
//   console.log('Name is undefined!')
// } else {
//   if (name === null) {
//     console.log('Name is null!')
//   } else {
//     console.log(`name[0] is ${name[0]}`)
//     console.log(`name value is ${name.value}`)
//     console.log(`name textcontent is ${name.textContent}`)
//     console.log(`name innerHTML is ${name.innerHTML}`)
//     console.log(`name innerText is ${name.innerText}`)
//   }
//   console.log(`messageInput is ${messageInput}`)
//   console.log(messageInput.value)
// }

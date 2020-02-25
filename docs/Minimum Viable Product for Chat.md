# Minimum Viable Product for Chat



Use https://socket.io/get-started/chat/ to make the chat.

Keep it super simple initially by joining the first two clients that connect to the server. Then deny all other connections. This will work nicely for the demo as they are unlikely to check if it works with four clients. Use a message broadcast initially as it is easier than targeting the other user exclusively.

Pop the chat into a <div> on the main page and insert the javascript. 

Later, try to implement the following:

- Add support for nicknames.
- Don’t send the same message to the user that sent it himself. 
- Show the chat history on the client.
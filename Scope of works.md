# Scope of works

Hi all, here are some suggestions on what we need to do this week and next. 

I'm basing it on what they have outlined in the requirements, while taking into account the chess game concept.

I'm not sure how they expect us to get all this done in the time available.



___

## Devops/CI/Testing

- Configure Jest and write tests from stuff. This is a massive job so I suggest we limit it to a few test cases to show that we have made an effort. 
- Work out how to use travis and get that up and running 
- Work out how to get linting running
- Work out how to deploy to Heroku and get that running
- Maintain the build by monitoring github and the branches, making sure we have a working master most of the time
- Write documentation like the readme.md and also a file to explain the layout and workings of the app
- Write a summary of the project as slides, sectioning it for each person to describe their bit
- Make sure files and locations of files make sense and there is commenting and good structure
- Do code review to ensure we use ES6 like arrow functions, const, promises etc

## User management

- Create home page, login page, registration page and password recovery page. Persist login details (eg bcrypt for passwords) using something like passport. Probably use sequelize to save the user details.
- Have a list on the server that people can access to find other users to play chess with 

## REST API definition

- Someone to write the API for the clients to use. 
- Implement the routes, controllers and model along with SQL persistence of the models. 
- Store the histories of the moves and games and chats in SQL



___

## Chat window on client

- When logged in and connected to another user, use socket.io or similar to send messages to the server which then get sent to the other person. This will need to be in real time using events/messaging rather than just polling.
- Show the history of the chat.

## Chess window on client 

- Will probably need client side code that validates moves so that you can pick up pieces in real time
- Drag and drop capacity for moving the pieces
- Send fen codes to the server (which might validate whether the game has finished) and will send them to the other player. 

## Templating and GUI

- I'm not sure yet how to incorporate templates into the app. Maybe they won't notice....
- Someone needs to get some good looking graphics without spending much time on it

___



We have to remember that they will look at the github history and can tell if someone has/hasn't been contributing, so make sure you commit stuff or you will do poorly =(

Once we work out who is doing what, there are some dependencies (eg the REST API kind of has to be available for the clients to post move data to). But this can be fudged for the first few days.

The chat client seems completely dependent on the server so socket.io will have to be integrated to the server quickly.

I don't know if we want to have several branches each (for different bits of functionality) or just one branch each "yourname". That would probably be fine. 

I think the hardest part is the chess window so Jasper should get that. I'm confident I could do any of the other roles with enough time. 

Rita, Gerald and I should negotiate the tasks on Wednesday.
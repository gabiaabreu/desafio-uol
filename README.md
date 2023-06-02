# UOLHOST

### 📃 Disclaimer

This app (currently in progress) is my attempt at the UOLHOST front-end challenge, which you can learn more about [here](https://github.com/uolhost/test-frontEnd). The main goal was to create a website following a pre-made design and interface.

It's a client list that displays some info and includes features like **editing** an existing user or **adding** a new one. I also added some extra features, like **deleting** an user. Forms have **masks** and **validation** for phone and CPF inputs. I implemented snackbar warnings, not found and empty state components.

The API endpoint made available by UOL was no longer accessible when I started doing it, so I mocked my own using **JSON Server**.

This is a work in progress, so I'll be adding new features in the future and improve what I already made. I'll also add unit tests later on.

### 🎬 Screenshots
![image](https://github.com/gabiaabreu/desafio-uol/assets/99040538/b1ee024c-c7f4-4613-a854-eee453ad10c7)  
-------------------------------------------------
![image](https://github.com/gabiaabreu/desafio-uol/assets/99040538/7c31b6c3-9c02-4cd4-8bbb-74866640df46)

### 🚀 How to run 

For dependencies:
```
npm install
```
Running JSON server:
```
json-server --watch db.json
```
Running react app:
```
npm start
```
### 🛠 What I used: languages, libs, frameworks, tools and so on
TypeScript  
JSON Server, Axios  
React, create-react-app  
React Router DOM  
React Hook Form, Yup  
HTML, CSS and CSS modules  
Material UI  
Eslint, Prettier  

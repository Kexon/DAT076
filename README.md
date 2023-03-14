# DAT076 [![CI workflow](https://github.com/Kexon/DAT076/actions/workflows/ci.yml/badge.svg)](https://github.com/Kexon/DAT076/actions/workflows/ci.yml)

Project repository for Web applications (DAT076) at Chalmers University of Technology.

## Folder structure

- [/client](https://github.com/Kexon/DAT076/tree/main/client) - source code for the frontend created in React.

- [/server](https://github.com/Kexon/DAT076/tree/main/server) - source code for the backend created in Express.

- [/docs](https://github.com/Kexon/DAT076/tree/main/docs) - the final report can be found here.

## Instructions

Please note that these instructions assume that [Node.js version 16+](https://nodejs.org/en/download) is installed and configured.

- Use a terminal of your choice to clone the repository:

```console
git clone https://github.com/Kexon/DAT076.git
```

- Head into the cloned folder:

```console
cd DAT076
```

- Create a .env file with the following content:

```console
SECRET_KEY="funny_secret_bere"
DB_URI="<DB_URI to a MongoDB database>"
DB_URI_TEST="<DB_URI to a MongoDB test database>"
```

- Run the following two commands to install all the required packages:

```console
cd client && npm install && npm run build
cd .. && cd server && npm install
```

- From the server folder, run the following command to start the application:

```console
npm run dev
```

Go to http://localhost:8080 to use the application. Note that you need to be logged in to be able to access any features. You can create an account from http://localhost:8080/signup.

## Screenshots

![Login page](/docs/screenshots/login.png?raw=true)
![Home page](/docs/screenshots/home.png?raw=true)
![Ticket page](/docs/screenshots/ticket.png?raw=true)

## Contributors

- [Pouya Shirin](https://github.com/Kexon)

- [Albin Sundström](https://github.com/sundstromalbin)

- [Emil Svensson](https://github.com/emilsvennesson)

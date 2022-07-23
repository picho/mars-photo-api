# mars-photo-api

This back-end app is meant to cover all the required functionalities described in Adwaiseo's case study. Its focus is to provide values that are taken from a Nasa services.

## Installation

Use the following steps to make this app work.

1. Clone this repository or download it.
2. Put the app in a folder.
3. Using a terminal o cmd, go to the folder.
4. Once in the folder, write ```npm install``` and press enter. Wait until all the packages are installed.
5. Once the installation is finished, there are commands to run the app.

- ```npm build```: This command is going to compile all the TypeScript files to create the JavaScript files.
- ```npm run dev```: This command is going to start the app in dev mode.
- ```npm start```: This command is going to start the app using the compiled JavaScript files.
- ```npm test```: This command is going to start the test suit. (**Important: if this commands fails, run npm build to create the test in Javascript and than run again npm test**)

If you user the command npm dev. When the app is running, if everything is ok, you should see the following message.

```
> mars-photo-api@1.0.0 dev
> nodemon src/server.ts

[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/server.ts`
Server is running at port 5000

```

## Components

This api has two routes and you should use the http protocols to call their endpoints. The routes are **Images** and **Login**.

### Login

This route only has one endpoint. It has to be called with the http protocol get to get the token that is needed to call the endpoint images.

```
Example URL -> localhost:5000/login/getToken/<Username>
```

### Images

This route has many endpoints. It has to be called with the http protocols. The endpotins are:

get -> sending a rover name and query params () -> get the photos taken by the rover.

```
Example ULR -> localhost:5000/images/<Rover>/photo?sol=<SolValue>&pages=<PageValue>&camera=<Camera>
```

**Note: For this endpoint, parameter sol is required**

### Disclaimer

- In Login route, in the url the value for <Username> can be any string value.

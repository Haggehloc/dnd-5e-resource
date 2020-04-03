# dnd-5e-resource

dnd-5e-resource is a website designed to get information and stats about dnd 5e.

## Installation

After cloning the code from github, goto the file "~/dnd-5e-resource/config/keys.js"
This file exports the config for this website. Look at the mongoURI variable, and 
change the variable to hold the mongoURI of the database that this website should use.



## Usage

Once installed with a database, its as simple as running this command

```bash
npm run dev
```

The server should then boot up and it should open the client in a browser
 window. The server will be running on port 5000 and the client will run 
 on port 3000. If you would like to run it on a different port, simply 
 change the port variable in the server.js file.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
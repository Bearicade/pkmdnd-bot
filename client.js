const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json'); //fetching and saving token
const config = require('./config.json'); //fetching config information
const media = require('./media.json'); //fetching media
const fs = require('fs');

require('./command.js')();

client.on('ready', () => { //prints to console when logged in and sets playing status
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity(randomFrom(media.activities)); //random activity from media.json

  fs.readFile('./config.json', (err, data) => {
    if (!err) {
      console.log("\n" + data.toString())
    } else {
      console.error(err)
    }
  })
});

client.on('disconnect', () => {
  console.log(`${client.user.tag} has logged out.`);
});

//Puts a new user into level one role from the ID given in config.json
client.on('guildMemberAdd', member => {
  console.log(`\n${member.user.username} has joined the server.`);

  //Create a file for the user
  fs.mkdir('./profile/' + member.user.id + '/', (err) => {
    if (!err) return; //if callback does not return error, continue
    console.error(err); //print to console if error occurs
  });
});

//removes user file when they leave server
client.on('guildMemberRemove', member => {
  console.log(`\n${member.user.username} has left the server.`);
  fs.rmdir('./userdata/' + member.user.id + '/', (err) => {
    if (!err) return; //if callback does not return error, continue
    if (err.code === 'ENOENT') {
      console.error('Failure attempt removing directory. ' + member.user.username + '\'s data does not exist.');
      return; //print to console if file does not exists in case of 'ENOENT' error
    } else {
      console.error(err);
    }
  });
});

client.on('message', msg => {

  if (msg.author.bot) return;
  if (msg.content.indexOf(config.prefix) !== 0) return;

  //Declaring array variable to catch multiple prompts with various properties
  var args = msg.content.substring(1).split(' '); //splits command at every space and creates array
  var cmd = args.shift().toLowerCase(); //removes and returns first item; convert to lowercase

  //Prints user, args, and cmd to console for debugging
  console.log("\nplayer: " + `${msg.author.username}`);
  console.log("args[]: " + args);
  console.log("command: " + cmd);

  runCommand(config.prefix, client, msg, cmd, args);
});

client.login(auth.token);

//Start

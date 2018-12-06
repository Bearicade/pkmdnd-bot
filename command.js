var media = require("./media.json");
var moves = require("./moves.json");
const config = require("./config.json");

module.exports = function () {
  runCommand = function (prefix, client, msg, cmd, args) {
    try {
      //Try before throwing error
      //Start comparing and analyzing commands
      //Switch cases are temporary; implement only small processes
      switch (cmd) {

        case 'list':  //lists the public commands
        msg.channel.send("```These are my current commands:\n\n" +
        "- ping: Pong!\n" +
        "- hello: Say hi to me!\n" +
        "- config: See your current settings.\n" +
        "- roll [#][die]: I'll roll the specified die. (WIP)\n" +
        "- move [move ID]: Check the move's properties (I only have 1-132)" + "```");
        break;

        case 'roll':  //roll random number within parameter

        break;

        //For fun, text responses
        case 'ping':
        msg.channel.send("Pong!");
        break;

        case 'config':
        msg.channel.send("```prefix: \"" + config.prefix + "\"\n" +
        "server: \"" + config.server + "\"\n" + "channel: \"" + config.channel + "\"\n" + "```");
        break;

        case 'gutentag':
        case 'hola':
        case 'greetings':
        case 'greet':
        case 'hello': //takes both 'hi' and 'hello'
        case 'hi':
        msg.channel.send(randomFrom(media.greetings) + `*${msg.member}!*`);
        break;

        case 'move':
        let move = "";
          for (let i = 0; i < args.length; i++) {
            move = move + args[i].toLowerCase();
          }

        msg.channel.send("```Move: " + moves[move].move + "\n" +
        "Category: " + moves[move].category + "\n" +
        "Type: " + moves[move].type + "\n" +
        "Accuracy: " + moves[move].accuracy + "\n" +
        "PP: " + moves[move].pp + "\n\n" +
        "Damage: " + moves[move].dmg + "\n" +
        "Archetype: " + moves[move].archetype + "\n" +
        "Additional Effects: " + moves[move].add + "```");
        break;

        default:  //default reply, unrecognized command
        msg.channel.send("Sorry, I don't know that command. " +
        "Type `" + prefix + "list` for a list of commands.");
      }
    } catch (err) {//if any error occurs, catch and relay error
      console.error(err.code);
      errorHandle(err, msg);
    }
  }

  errorHandle = function (err, msg) {
    if (err.code === undefined) {
      msg.channel.send("I am a work-in progress!");
    } else {
      msg.channel.send("Error: unhandled exception " + err.code);
    }
  }

  randomFrom = function (listID)  {
    return listID[(Math.round(Math.random() * (listID.length - 1)))];
  }
}

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
        "- roll d[#]: IN-PROGRESS." + "```");
        break;

        case 'roll':  //roll random number within parameter
        if (isNaN(parseInt(args[0]))) {
          msg.channel.send("Invalid entry. Please enter number after " + prefix + "roll.");
        } else {
          msg.channel.send("`rolled " + Math.ceil(Math.random() * args[0]) + "`");
        } break;

        //For fun, text responses
        case 'ping':
        msg.channel.send("Pong!");
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
            move = move + args[i];
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
      msg.channel.send("Error: No entry found");
    } else {
      msg.channel.send("Error: unhandled exception " + err.code);
    }
  }

  randomFrom = function (listID)  {
    return listID[(Math.round(Math.random() * (listID.length - 1)))];
  }
}

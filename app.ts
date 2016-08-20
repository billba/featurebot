import { ConsoleConnector, UniversalBot, Prompts, DialogAction, IntentDialog, HeroCard, CardAction, Message } from 'botbuilder';

var connector = new ConsoleConnector().listen();
var bot = new UniversalBot(connector);

var commands = new IntentDialog();
bot.dialog('/', commands);

commands.onDefault(DialogAction.send("valid commands: hero"));

commands.matches("hero", (session, args, next) => {
        session.send("Your Herocard Here");
    });

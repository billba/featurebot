import { ChatConnector, UniversalBot, Prompts, DialogAction, IntentDialog, HeroCard, CardAction, Message } from 'botbuilder';
import { createServer } from 'restify'; 

var server = createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
var connector = new ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new UniversalBot(connector);

bot.dialog('/',
    new IntentDialog()
    .matches("hero", (session, args, next) => {
        session.send("Your Herocard Here");
    })
    .onDefault(DialogAction.send("valid commands: hero"))
);
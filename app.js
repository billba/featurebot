"use strict";
const botbuilder_1 = require('botbuilder');
const restify_1 = require('restify');
var server = restify_1.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new botbuilder_1.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new botbuilder_1.UniversalBot(connector);
var commands = new botbuilder_1.IntentDialog();
bot.dialog('/', commands);
commands.onDefault(botbuilder_1.DialogAction.send("valid commands: hero"));
commands.matches("hero", (session, args, next) => {
    session.send("Your Herocard Here");
});

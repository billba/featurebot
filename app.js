"use strict";
const botbuilder_1 = require('botbuilder');
const restify_1 = require('restify');
var server = restify_1.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
/*
var connector = new ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
*/
var connector = new botbuilder_1.ConsoleConnector().listen();
var bot = new botbuilder_1.UniversalBot(connector);
bot.dialog('/', new botbuilder_1.IntentDialog()
    .matches(/^hero/i, (session, args, next) => {
    session.send("Your Herocard Here");
})
    .onDefault(botbuilder_1.DialogAction.send("valid commands: hero")));

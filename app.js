"use strict";
const botbuilder_1 = require('botbuilder');
const restify_1 = require('restify');
var server = restify_1.createServer();
server.listen(process.env.port || process.env.PORT || 3978, '::', () => {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new botbuilder_1.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
//var connector = new ConsoleConnector().listen();
var bot = new botbuilder_1.UniversalBot(connector);
server.post('/api/messages', connector.listen());
const sendAttachments = (session, attachments) => session.send(new botbuilder_1.Message(session)
    .text("nominal message")
    .sourceEvent({ '*': attachments }));
bot.dialog('/', new botbuilder_1.IntentDialog()
    .matches(/^hero/i, session => sendAttachments(session, {
    attachments: [{
            contentType: "application/vnd.microsoft.card.hero",
            content: {
                title: 'Title',
                subtitle: 'Subtitle',
                images: [{
                        url: 'http://thiswas.notinventedhe.re/on/2009-09-21'
                    }, {
                        url: 'http://thiswas.notinventedhe.re/on/2009-09-22'
                    }],
                text: 'This is the hero card text',
                buttons: [{
                        type: 'imBack',
                        value: 'imBack value',
                        title: 'imBack title'
                    }, {
                        type: 'openUrl',
                        value: 'openUrl value',
                        title: 'openUrl title'
                    }, {
                        type: 'postBack',
                        value: 'postBack value',
                        title: 'postBack title'
                    }]
            }
        }]
}))
    .matches(/^image/i, session => sendAttachments(session, {
    attachments: [{
            contentType: "image/png",
            contentUrl: 'http://thiswas.notinventedhe.re/on/2009-09-21',
            name: '2009-09-21'
        }]
}))
    .onDefault(botbuilder_1.DialogAction.send("valid commands: hero")));

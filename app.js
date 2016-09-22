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
const sendActivity = (session, activity) => {
    console.log("sending", activity);
    session.send(new botbuilder_1.Message(session)
        .text("nominal message")
        .sourceEvent({ '*': activity }));
};
bot.dialog('/', new botbuilder_1.IntentDialog()
    .matches(/^hero/i, session => sendActivity(session, {
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
    .matches(/^carousel/i, session => sendActivity(session, {
    attachmentLayout: "carousel",
    attachments: [{
            contentType: "application/vnd.microsoft.card.hero",
            content: {
                title: 'Title1',
                subtitle: 'Subtitle1',
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
        },
        {
            contentType: "application/vnd.microsoft.card.hero",
            content: {
                title: 'Title2',
                subtitle: 'Subtitle2',
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
        },
        {
            contentType: "application/vnd.microsoft.card.hero",
            content: {
                title: 'Title3',
                subtitle: 'Subtitle3',
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
        },
        {
            contentType: "application/vnd.microsoft.card.hero",
            content: {
                title: 'Title4',
                subtitle: 'Subtitle4',
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
    .matches(/^image/i, session => sendActivity(session, {
    attachments: [{
            contentType: "image/png",
            contentUrl: 'http://thiswas.notinventedhe.re/on/2009-09-21',
            name: '2009-09-21'
        }]
}))
    .matches(/^receipt/i, session => sendActivity(session, {
    attachments: [{
            contentType: "application/vnd.microsoft.card.receipt",
            content: {
                title: "Recipient's Name",
                items: [
                    {
                        price: "$22.00",
                        title: "EMP Museum",
                        image: {
                            url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Night_Exterior_EMP.jpg"
                        }
                    },
                    {
                        price: "$22.00",
                        title: "Space Needle",
                        image: {
                            url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Seattlenighttimequeenanne.jpg"
                        }
                    }
                ],
                facts: [
                    {
                        value: "1234567898",
                        key: "Order Number"
                    },
                    {
                        value: "VISA 4076",
                        key: "Payment Method"
                    },
                    {
                        value: "WILLCALL",
                        key: "Delivery Method"
                    }
                ],
                tax: "$4.40",
                total: "$48.40"
            }
        }]
}))
    .onDefault(botbuilder_1.DialogAction.send("valid commands: hero, image, carousel, receipt")));

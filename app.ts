import { ChatConnector, ConsoleConnector, UniversalBot, Prompts, DialogAction, IntentDialog, HeroCard, CardAction, Message, Session } from 'botbuilder';
import { createServer } from 'restify'; 

var server = createServer();
server.listen(process.env.port || process.env.PORT || 3978, '::', () => {
   console.log('%s listening to %s', server.name, server.url); 
});
  
var connector = new ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//var connector = new ConsoleConnector().listen();

var bot = new UniversalBot(connector);
server.post('/api/messages', connector.listen());

const sendActivity = (session: Session, activity: any ) => {
    console.log("sending", activity);
    session.send(new Message(session)
        .sourceEvent({'*': activity})
    );
}

bot.dialog('/',
    new IntentDialog()
    .matches(/^hero/i, session =>
        sendActivity(session, {
            type: "message",
            attachments: [{
                contentType: "application/vnd.microsoft.card.hero",
                content: {
                    title: 'Title',
                    subtitle: 'Subtitle',                
                    images: [{
                        url: 'http://thiswas.notinventedhe.re/on/2009-09-21'
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
        })
    )
    .matches(/^thumbnail/i, session =>
        sendActivity(session, {
            type: "message",
            attachments: [{
                contentType: "application/vnd.microsoft.card.thumbnail",
                content: {
                    title: 'Title',
                    subtitle: 'Subtitle',                
                    images: [{
                        url: 'http://thiswas.notinventedhe.re/on/2009-09-22'
                    }],
                    text: 'This is the thumbnail card text',
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
        })
    )
    .matches(/^carousel/i, session =>
        sendActivity(session, {
            type: "message",
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
        })
    )
    .matches(/^image/i, session =>
        sendActivity(session, {
            type: "message",
            attachments: [{
                contentType: "image/png",
                contentUrl: 'http://thiswas.notinventedhe.re/on/2009-09-21',
                name: '2009-09-21' 
            }]
        })
    )
    .matches(/^receipt/i, session =>
        sendActivity(session, {
            type: "message",
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
        })
    )
    .matches(/^typing/i, session =>
        sendActivity(session, {
            type: "typing"
        })
    )
    .onDefault(DialogAction.send("valid commands: hero, thumbnail, image, carousel, receipt"))
);
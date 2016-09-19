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
        .text("nominal message")
        .sourceEvent({'*': activity})
    );
}

bot.dialog('/',
    new IntentDialog()
    .matches(/^hero/i, session =>
        sendActivity(session, {
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
        })
    )
    .matches(/^carousel/i, session =>
        sendActivity(session, {
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
            attachments: [{
                contentType: "image/png",
                contentUrl: 'http://thiswas.notinventedhe.re/on/2009-09-21',
                name: '2009-09-21' 
            }]
        })
    )
    .onDefault(DialogAction.send("valid commands: hero, image, carousel"))
);
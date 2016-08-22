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

const sendAttachments = (session: Session, attachments: any ) =>
    session.send(new Message(session)
        .text("nominal message")
        .sourceEvent({'*': attachments})
    );
 
bot.dialog('/',
    new IntentDialog()
    .matches(/^hero/i, session =>
        sendAttachments(session, {
            attachments: [{
                contentType: "application/vnd.microsoft.card.hero",
                content: {
                    title: 'Title',
                    subtitle: 'Subtitle',                
                    images: [{
                        url: 'http://thiswas.notinventedhe.re/on/2009-09-21',
                        alt: 'Image alt text'
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
        sendAttachments(session, {
            attachments: [{
                contentType: "image/png",
                contentUrl: 'http://thiswas.notinventedhe.re/on/2009-09-21',
                name: '2009-09-21' 
            }]
        })
    )
    .onDefault(DialogAction.send("valid commands: hero"))
);
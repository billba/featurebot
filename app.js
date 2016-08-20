"use strict";
const botbuilder_1 = require('botbuilder');
var connector = new botbuilder_1.ConsoleConnector().listen();
var bot = new botbuilder_1.UniversalBot(connector);
const url = "https://api.projectoxford.ai/luis/v1/application?id=de0526fa-14b4-482b-a541-8faffca74b25&subscription-key=26c9848b5ed7495fb58d2d20a1305fb5";
var recognizer = new botbuilder_1.LuisRecognizer(url);
var dialog = new botbuilder_1.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);
const fs = require('fs');
const events = JSON.parse(fs.readFileSync("events.json", 'utf8'))["events"];
dialog.onDefault(botbuilder_1.DialogAction.send("I'd love to help you find out about upcoming events!"));
dialog.matches('EventInfo', [
        (session, args, next) => {
        const location = botbuilder_1.EntityRecognizer.findEntity(args.entities, "Location");
        const performer = botbuilder_1.EntityRecognizer.findEntity(args.entities, "Performer");
        const type = botbuilder_1.EntityRecognizer.findEntity(args.entities, "Type");
        const event = session.dialogData.event = {
            location: location && location.entity,
            performer: performer && performer.entity,
            type: type && type.entity
        };
        next();
    },
    // BEGIN stuff I type in for the demo
        (session, args, next) => {
        const event = session.dialogData.event;
        if (!event.type) {
            const msg = new botbuilder_1.Message().attachments([new botbuilder_1.HeroCard(session)
                    .text("test")
                    .buttons([
                    new botbuilder_1.CardAction(session).title("bill")
                ])]);
            session.send(msg);
            botbuilder_1.Prompts.text(session, "What kind of event?");
        }
        else
            next();
    },
        (session, args, next) => {
        const event = session.dialogData.event;
        if (!event.type)
            event.type = args.response;
        if (!event.location)
            botbuilder_1.Prompts.text(session, "Which park?");
        else
            next();
    },
        (session, args, next) => {
        const event = session.dialogData.event;
        if (!event.location)
            event.location = args.response;
        if (!event.performer)
            botbuilder_1.Prompts.text(session, "Who would you like to see?");
        else
            next();
    },
        (session, args, next) => {
        const event = session.dialogData.event;
        if (!event.performer)
            event.performer = args.response;
        next();
    },
    // END stuff I type in for the demo
        (session, args, next) => {
        const event = session.dialogData.event;
        const found = events.find(e => e.location.toUpperCase() === event.location.toUpperCase() &&
            e.performer.toUpperCase() === event.performer.toUpperCase() &&
            e.type.toUpperCase() === event.type.toUpperCase());
        if (found)
            session.send(`There's a ${found.type} featuring ${found.performer} at ${found.location} on ${found.time}`);
        else
            session.send("Sorry, couldn't find that event. Please try again.");
    }
]);

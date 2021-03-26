require('dotenv').config();
import { bootstrap, Handler } from "discord-framework";
import { ReactCommand } from "./commands/react";
import { TestCommand } from "./commands/test";
import { RenameCommand } from "./commands/rename";
import { TalkObamaCommand } from "./commands/obama";
import { TextHandler } from "./commands/text/handler";
import { EightBallCommand } from "./commands/eight_ball";
import { FlipCommand } from "./commands/flip";
import { RouletteHandler } from "./commands/casino/handler";
import { DeveloperHandler } from "./commands/dev/handler";
// import { DadJokeListener } from "./listeners/dad_joke";
import { ExcuseCommand } from "./commands/excuse";
import { SkemaHandler } from "./commands/skema/handler";
import "./helpers/date";
import { GrupperumCommands } from "./commands/grupperum";
import { voiceStateUpdate } from "./commands/grupperum/voice-update";
import { minecraftChannelWatch } from "./listeners/minecraft_channel";

@Handler({
    name: 'main',
    commands: [
        ReactCommand,
        TestCommand,
        RenameCommand,
        TalkObamaCommand,
        EightBallCommand,
        FlipCommand,
        ExcuseCommand,
        ...GrupperumCommands
    ],
    handlers: [
        TextHandler,
        RouletteHandler,
        DeveloperHandler,
        SkemaHandler
    ],
    description: 'Main handler'
})
class MainHandler { }

const client = bootstrap(MainHandler, {
    prefix: '!',
    token: process.env.BOT_TOKEN as any,
    // listners: [ DadJokeListener ]
});

client.on('voiceStateUpdate', voiceStateUpdate);
client.on('message', minecraftChannelWatch);

client.on('ready', () => {
    // client.channels.fetch('790888306359533619').then(chan => (chan as any).send('?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'))
})

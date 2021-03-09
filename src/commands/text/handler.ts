import { Handler } from "discord-framework";
import { FunkyCommand } from "./funky";
import { MockingCommand } from "./mocking";
import { ZalgoCommand } from "./zalgo";

@Handler({
    name: 'text',
    commands: [FunkyCommand, MockingCommand, ZalgoCommand],
    description: 'Fun with text'
})
export class TextHandler { }
import { Handler } from "discord-framework";
import { SkemaGetCommand } from "./get";
import { SkemaNextCommand } from "./next";
import { SkemaNowCommand } from "./now";
import { SkemaUpdateCommand } from "./update";

@Handler({
    name: 'skema',
    commands: [
        SkemaNowCommand,
        SkemaNextCommand,
        SkemaUpdateCommand,
        SkemaGetCommand
    ],
    silentOnNoCommand: false,
    description: 'En samling command der har med ITslearning at gøre'
})
export class SkemaHandler { }
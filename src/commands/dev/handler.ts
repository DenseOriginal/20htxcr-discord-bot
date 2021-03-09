import { Handler, hasRoles } from "discord-framework";
import { ListEmojisCommand } from "./list_emojies";

@Handler({
    name: 'developer',
    alias: ['dev'],
    canRun: [hasRoles(['Developer'])],
    commands: [ ListEmojisCommand ],
    description: 'Developer commands'
})
export class DeveloperHandler {}
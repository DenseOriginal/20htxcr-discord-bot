import { Action, Command } from "discord-framework";
import { excuses } from "../assets/excuses";

@Command({
    name: 'excuse',
    description: 'Gives you a random excuse'
})
export class ExcuseCommand implements Action {
    action() {
        return 'I\'d love to, but ' + excuses[~~(Math.random() * excuses.length)];
    }
}
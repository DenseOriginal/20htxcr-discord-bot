import { Action, ActionContext, Command } from "discord-framework";
import { emojis } from "../../helpers/emojis";

@Command({
    name: 'funky',
    arguments: [{ key: 'message', type: 'string', rest: true }],
    description: 'Return any message as emoji characters'
})
export class FunkyCommand implements Action {
    action({ args }: ActionContext) {
        const chars = [...args.message.join(' ').toLowerCase()];
        return chars.map(char => ((emojis as any)[char] || [char])[0]).join(' ');
    }
}
import { Action, ActionContext, Command } from "discord-framework";
import { makeZalgo } from "../../helpers/zalgo";

@Command({
    name: 'zalgo',
    arguments: [{ key: 'textToZalgo', type: 'string', rest: true }],
    description: 'Summons the devil'
})
export class ZalgoCommand implements Action {
    action({ args }: ActionContext) {
        const textToZalgo = args.textToZalgo.join(" ");
        return makeZalgo(textToZalgo);
    }
}
import { Action, ActionContext, Command, UseClient } from "discord-framework";
import { Client, Message } from "discord.js";
import { emojis } from "../helpers/emojis";

@Command({
    name: 'react',
    arguments: [
        { key: 'messageToReact', type: 'string' },
        { key: 'message', type: 'string' }
    ],
    description: 'Reacts to a message with an input message'
})
export class ReactCommand implements Action {
    @UseClient() client: Client;
    async action({ message, args }: ActionContext) {
        const messageToReact = await message.channel.messages.fetch(args.messageToReact);
        const chars: string[] = [...args.message.toLowerCase()];
        
        if(!messageToReact) return 'Cannot find message';

        const occurences: any = {};

        for (const char of chars) {
            const occurrenceOfChar = occurences[char] || 0;
            await messageToReact.react(emojis[char][occurrenceOfChar]);
            occurences[char] = occurrenceOfChar + 1;
        }
    }
}
import { Action, ActionContext, Command, UseClient } from "discord-framework";
import { Client } from "discord.js";

@Command({
    name: 'listEmojis',
    description: 'Finder alle custom emojies botten har adgang til'
})
export class ListEmojisCommand implements Action {
    @UseClient() client!: Client

    action({ message }: ActionContext) {
        console.log('yee');
        const messageToReact = message.channel.lastMessage;
        message?.guild?.emojis?.cache?.forEach(async (e) => {
            try {
                console.log(e.identifier);
            } catch (e) { }
        });
    }
}
import { Action, ActionContext, Command, isSentInGuild, UseClient } from "discord-framework";
import { Client } from "discord.js";

@Command({
    name: 'rename',
    canRun: [isSentInGuild('This command is guild only')],
    arguments: [{ key: 'newName', type: 'string' }],
    description: 'Renames the bot'
})
export class RenameCommand implements Action {
    @UseClient() client!: Client;
    async action({ args, message }: ActionContext) {
        const newName: string = args.newName;
        message.guild.me.setNickname(newName);
        // await this.client.user.setUsername(newName);
        return `Changed my name to ${newName}`;
    }
}
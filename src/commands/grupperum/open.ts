import { Action, ActionContext, Command, createErrorEmbed, FriendlyError } from "discord-framework";
import { DiscordAPIError } from "discord.js";
import { inGruppeCategory } from "./authentication";

@Command({
    name: 'åben',
    alias: ['open'],
    description: 'Lukker et rum så der ikke kan joine flere personer',
    canRun: [inGruppeCategory]
})
export class OpenCommand implements Action {
    async action({ message }: ActionContext) {
        const voiceChannel = message.member?.voice.channel;
        const userLimit = voiceChannel?.userLimit;
        
        if(!userLimit) return 'Rummet er allerede åbent';
        try {
            // Open the channel
            await voiceChannel?.setUserLimit(0);
            return `Rummet er blevet åbnet`;
        } catch (error) {
            let errorMessage = 'Rummet blev ikke åbnet, fordi det skete en fejl';
            if(error instanceof DiscordAPIError) errorMessage = `Rummet blev ikke åbnet grundet "${error.message}"`;
            

            return createErrorEmbed(new FriendlyError(errorMessage));
        }
    }
}
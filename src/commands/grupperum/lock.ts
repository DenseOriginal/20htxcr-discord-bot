import { Action, ActionContext, Command, createErrorEmbed, FriendlyError } from "discord-framework";
import { DiscordAPIError } from "discord.js";
import { inGruppeCategory } from "./authentication";

@Command({
    name: 'lås',
    alias: ['lock'],
    description: 'Lukker et rum så der ikke kan joine flere personer',
    canRun: [inGruppeCategory]
})
export class LockCommand implements Action {
    async action({ message }: ActionContext) {
        const voiceChannel = message.member?.voice.channel;
        const usersInVoiceChat = voiceChannel?.members.array().length;
        if(typeof usersInVoiceChat == "undefined") return 'Ingen brugere i kanalen';
        try {
            await voiceChannel?.setUserLimit(usersInVoiceChat);
            return `Rummet er blevet sat til ${usersInVoiceChat} personer`;
        } catch (error) {
            let errorMessage = 'Rummet blev ikke låst, fordi det skete en fejl';
            if(error instanceof DiscordAPIError) errorMessage = `Rummet blev ikke låst grundet "${error.message}"`;
            

            return createErrorEmbed(new FriendlyError(errorMessage));
        }
    }
}
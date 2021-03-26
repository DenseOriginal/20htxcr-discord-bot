import { FriendlyError } from "discord-framework";
import { AuthFunction } from "discord-framework/lib/utils/authentication";
import { Message } from "discord.js";
import { gruppeRumID } from "./shared";

export function inGruppeCategory(message: Message) {
    const voiceState = message.member?.voice;
    if(!voiceState) return new FriendlyError('');

    const categoryID = voiceState.channel?.parentID;
    
    if(categoryID != gruppeRumID) return new FriendlyError('Du skal være i et Grupperum');

    return;
}
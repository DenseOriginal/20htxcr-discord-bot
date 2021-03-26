import { VoiceState } from "discord.js";
import { gruppeRumID } from "./shared";

export function voiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
    try {
        // User wasn't in vc before
        if(!oldState.channelID) return;
    
        // User left a channel that wasn't a gruppeRum
        if(oldState.channel?.parentID != gruppeRumID) return;
    
        // If the vc the user left is empty remove the user limit
        if(oldState.channel.members.array().length == 0) oldState.channel.setUserLimit(0);
    } catch (err_) { }
}
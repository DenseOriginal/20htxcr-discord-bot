import { Message } from "discord.js";

const questionMarkREGEX = /^\?+$/;
const MinecraftChannelID = "790888306359533619";
export async function minecraftChannelWatch(message: Message) {
    try {
        const channel = message.channel;
        if(channel.id != MinecraftChannelID) return;
        const content = message.content;
        if(!questionMarkREGEX.test(content)) await message.delete();
    } catch (error) {
        
    }
}
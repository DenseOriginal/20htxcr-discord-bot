import { Action, Command } from "discord-framework";
import { MessageAttachment } from "discord.js";

@Command({
    name: 'flip',
    description: 'Flip flip'
})
export class FlipCommand implements Action {
    isFlipOn = true;

    action() {
        this.isFlipOn = !this.isFlipOn;
        return new MessageAttachment(`./src/assets/switch_${this.isFlipOn ? 'off' : 'on'}.jpg`);
    }
}
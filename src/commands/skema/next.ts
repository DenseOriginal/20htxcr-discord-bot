import { Action, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { SkemaService } from "./skema.service";

@Command({
    name: 'næste',
    alias: ['next'],
    description: 'Finder næste modul'
})
export class SkemaNextCommand implements Action {
    constructor(public skemaService: SkemaService) {}

    action() {
        const nextClass = this.skemaService.skema.find(e => e.start.getTime() > Date.now());
        if(!nextClass) return new MessageEmbed().setTitle('Kan ikke finde den næste time');

        return SkemaService.makeSkemaEmbed(nextClass);
    }
}
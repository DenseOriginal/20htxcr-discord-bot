import { Action, ActionContext, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { SkemaService, SkemaItem, SkemaColors } from "./skema.service";

@Command({
    name: 'nu',
    alias: ['now'],
    description: 'Finder det modul man har nu'
})
export class SkemaNowCommand implements Action {
    constructor(public skemaService: SkemaService) {}

    action() {
        const classNow = this.skemaService.skema.find(e => e.start.getTime() < Date.now() && e.end.getTime() > Date.now());
        if(!classNow) return new MessageEmbed().setTitle('Ingen timer lige nu');

        return SkemaService.makeSkemaEmbed(classNow);
    }
}
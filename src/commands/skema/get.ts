import { Action, ActionContext, Command } from "discord-framework";
import { SkemaItem, SkemaService } from "./skema.service";
import { MessageEmbed } from "discord.js";

@Command({
    name: 'get',
    alias: ['find'],
    arguments: [{ key: 'time', type: 'date' }],
    description: 'Finder skema for en bestemt dag'
})
export class SkemaGetCommand implements Action {
    constructor(public skemaService: SkemaService) { }

    async action({ message, args }: ActionContext) {
        const dateToGet: Date = args.time;
        const datesToShow: SkemaItem[] = this.skemaService.skema.filter(e => datesAreOnSameDay(e.start, dateToGet));

        if(datesToShow.length == 0) return new MessageEmbed().setTitle('Ingen timer lige nu');
        datesToShow.map(SkemaService.makeSkemaEmbed)
            .forEach(embed => message.channel.send(embed));
    }
}

const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
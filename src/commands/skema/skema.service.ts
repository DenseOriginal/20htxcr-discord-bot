import { Service } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { async, VEvent } from "node-ical";

const url = "https://aarhustech.itslearning.com/Calendar/CalendarFeed.ashx?LocationType=3&LocationID=0&PersonId=422931&CustomerId=776&ChildId=0&Guid=0927738c7681e911a57c45246cdc6c01&Culture=da-DK&FavoriteOnly=True";

export interface SkemaItem {
    class: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    zoomLink?: string;
}

@Service()
export class SkemaService {
    skema: SkemaItem[] = [];

    constructor() {
        this.fetch();
    }

    async fetch() {
        const events: VEvent[] = <VEvent[]>Object.values(await async.fromURL(url));
        const schedule = events
            .map((event): SkemaItem => ({
                class: event.summary.split(' ')[0],
                title: event.summary,
                description: event.description,
                start: new Date(event.start),
                end: new Date(event.end),
                zoomLink: event.description.match(/https*:\/\/zoom.\w{1,3}\/j\/\d+(\?pwd=\w+)*/g)?.[0],
            })).filter(event => event.title.includes('(20htxcr)'));

        this.skema = schedule;
        return schedule;
    }

    static makeSkemaEmbed(classToMake: SkemaItem): MessageEmbed {
        const embed = new MessageEmbed()
            .setTitle(classToMake.title)
            .setDescription(classToMake.description)
            .setFooter(formatTimestamp(classToMake))
            .setColor((SkemaColors as any)[classToMake.class.toLowerCase()]);

        if(classToMake.zoomLink) embed.addField('Zoom link', classToMake.zoomLink);
        return embed;
    }
}

export const SkemaColors = {
    biologi: "#7F8F5A",
    dansk: "#4C9260",
    engelsk: "#7F8F5A",
    fysik: "#B16C4C",
    idehistorie: "#866994",
    informatik: "#866994",
    kemi: "#7F8F5A",
    klasse: "#72838D",
    matematik: "#7F8F5A",
    omlagt: "#80883D",
    programmering: "#408AB4",
    samfundsfag: "#72838D",
    studieblok: "#B16C4C",
    studieområdet: "#4C9260",
    teknologi: "#4C9260",
}

function formatTimestamp(skema: SkemaItem): string {
    const dateString = skema.start.toLocaleDateString().replace(/\./g, '-');
    const timeStringStart = skema.start.getHours().toString().padStart(2, '0') + ':' + skema.start.getMinutes().toString().padStart(2, '0');
    const timeStringEnd = skema.end.getHours().toString().padStart(2, '0') + ':' + skema.end.getMinutes().toString().padStart(2, '0');
    return `${dateString}, ${timeStringStart} - ${timeStringEnd}`; 
}
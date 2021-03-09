import { parseDate } from "chrono-node/dist/locales/en";
import { BaseArgumentType, FriendlyError, TypeRegistry } from "discord-framework";

export class DateArgumentType extends BaseArgumentType<Date> {
    constructor() {
        super('date');
    }

    parse(val: any): Date | FriendlyError {
        let stringToParse: string = val.toLowerCase();
        stringToParse = stringToParse.replace(/i ?dag/g, 'today');
        stringToParse = stringToParse.replace(/dage/g, 'days');
        stringToParse = stringToParse.replace(/dag/g, 'day');
        stringToParse = stringToParse.replace(/nu/g, 'now');
        stringToParse = stringToParse.replace(/i ?morgen/g, 'tomorrow');
        stringToParse = stringToParse.replace(/i ?går/g, 'yesterday');
        stringToParse = stringToParse.replace(/næste/g, 'next');
        stringToParse = stringToParse.replace(/sidste/g, 'last');
        stringToParse = stringToParse.replace(/denne/g, 'this');
        stringToParse = stringToParse.replace(/fra/g, 'from');
        stringToParse = stringToParse.replace(/siden/g, 'ago');
        monthsToTranslate.forEach(t => stringToParse = stringToParse.replace(t[0], t[1] as string));
        daysToTranslate.forEach(t => stringToParse = stringToParse.replace(t[0], t[1] as string));

        const parsedDate = parseDate(stringToParse);        
        if(!parsedDate) return new FriendlyError('Kan ikke analysere denne dato');
        return parsedDate;
    }
}

TypeRegistry.register('date', new DateArgumentType())

const monthsToTranslate = [
    [/januar/g, 'january'],
    [/febuar/g, 'february'],
    [/marts/g, 'march'],
    [/april/g, 'april'],
    [/maj/g, 'may'],
    [/juni/g, 'june'],
    [/juli/g, 'juli'],
    [/august/g, 'august'],
    [/september/g, 'september'],
    [/oktober/g, 'october'],
    [/november/g, 'november'],
    [/december/g, 'december'],
];

const daysToTranslate = [
    [/mandag/g, "monday"],
    [/tirsdag/g, "tuesday"],
    [/onsdag/g, "wednesday"],
    [/torsdag/g, "thursday"],
    [/fredag/g, "friday"],
    [/lørdag/g, "saturday"],
    [/søndag/g, "sunday"],
];
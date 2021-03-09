import { Action, ActionContext, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { throttle } from "../../helpers/throttle";
import { SkemaService } from "./skema.service";

@Command({
    name: 'opdater',
    alias: ['update'],
    canRun: [throttle(60000)],
    description: 'Opdatere skemaet'
})
export class SkemaUpdateCommand implements Action {
    constructor(public skemaService: SkemaService) { }

    async action({ message }: ActionContext) {
        const updateMessage = await message.channel.send(
            new MessageEmbed()
                .setTitle('Opdater skema')
                .setColor('#34abeb')
                .setTimestamp()
        );
        this.skemaService.fetch()
        .then(() => {
            updateMessage.edit(
                new MessageEmbed()
                    .setTitle('Skema er blevet opdateret')
                    .setColor('#12c94c')
                    .setTimestamp()
            );
        })
        .catch(() => {
            updateMessage.edit(
                new MessageEmbed()
                    .setTitle('Skema er ikke blevet opdateret')
                    .setColor('#c22b2b')
                    .setTimestamp()
            );
        });
    }
}
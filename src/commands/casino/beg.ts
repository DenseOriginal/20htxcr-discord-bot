import { Action, ActionContext, Command } from "discord-framework";
import { throttle } from "../../helpers/throttle";
import { RouletteService } from "./casino.service";

@Command({
    name: 'beg',
    canRun: [throttle(60000)],
    description: 'Take your chances and beg for money'
})
export class BegCommand implements Action {
    constructor(public rouletteService: RouletteService) { }

    action({ message }: ActionContext) {
        const user = message.author;
        const shouldGiveMoney = Math.random() > .5;
        if(!shouldGiveMoney) return 'No money for you';
        const amountToGive = ~~(Math.random() * 800);
        this.rouletteService.incrementBalance(user.id, amountToGive);

        return `You gained ${amountToGive}`;
    }
}
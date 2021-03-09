import { Action, ActionContext, Command } from "discord-framework";
import { RouletteService } from "./casino.service";

@Command({
    name: 'balance',
    alias: ['bal'],
    description: 'Shows your current balance in your wallet'
})
export class BalanceCommand implements Action {
    constructor(public rouletteService: RouletteService) {}

    action({ message }: ActionContext) {
        const user = this.rouletteService.getUser(message.author.id);
        return `Your balance is ${user.balance}`;
    }
}
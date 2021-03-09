import { BaseArgumentType, FriendlyError, TypeRegistry } from "discord-framework";
import { Message } from "discord.js";
import { container, injectable } from "tsyringe";
import { RouletteService } from "./casino.service";

@injectable()
export class BetArgumentType extends BaseArgumentType<number> {
    constructor(public rouletteService: RouletteService) {
        super('bet');
    }

    parse(val: any, message: Message): number | FriendlyError {
        const userId = message.author.id;
        const user = this.rouletteService.getUser(userId);
        if(val == 'max') return user.balance;
        if(isNaN(val) && val != 'max') return new FriendlyError('Bet has to be a number or "max"');
        if (user.balance < parseFloat(val)) return new FriendlyError(`You only have ${user.balance} in your bank`);
        return parseFloat(val);
    }
}

TypeRegistry.register('bet', container.resolve(BetArgumentType));
import { Action, ActionContext, Command, FriendlyError } from "discord-framework";
import { Message, MessageEmbed } from "discord.js";
import { throttle } from "../../helpers/throttle";
import { RouletteService } from "./casino.service";

@Command({
    name: 'roulette',
    arguments: [
        { key: 'amountToBet', type: 'bet' },
        { key: 'fieldToBetOn', type: 'string', validators: [isCorrectBet] },
    ],
    description: 'Bet on the roulette',
    canRun: [throttle(5000)]
})
export class BetCommand implements Action {
    constructor(public rouletteService: RouletteService) { }
    action({ message, args }: ActionContext) {
        const userId = message.author.id;
        const amountToBet = args.amountToBet;
        const usersBet: string = args.fieldToBetOn;
        const user = this.rouletteService.getUser(userId);
        this.rouletteService.incrementBalance(userId, -amountToBet);

        const rouletteOutcome = ~~(Math.random() * 37);
        const rouletteColor = rouletteOutcome == 0 ? 'green' : rouletteOutcome % 2 == 0 ? 'red' : 'black';

        // Users bet is either red or black
        // And outcome isn't o
        if (['red', 'black'].includes(usersBet) && rouletteOutcome != 0) {
            // User guessed the correct color
            if (usersBet == rouletteColor) {
                this.rouletteService.incrementBalance(userId, amountToBet * 2);
                return createReturnEmbed(
                    true,
                    message.author.username,
                    usersBet,
                    rouletteColor,
                    amountToBet,
                    user.balance
                );
            }
        }

        // User guessed the correct number
        if (+usersBet == rouletteOutcome) {
            this.rouletteService.incrementBalance(userId, amountToBet * 37);
            return createReturnEmbed(
                true,
                message.author.username,
                usersBet,
                rouletteOutcome + '',
                amountToBet * 36,
                user.balance
            );
        }

        // User lost
        // Add money to owner
        this.rouletteService.incrementBalance('248363557370986496', amountToBet);
        return createReturnEmbed(
            false,
            message.author.username,
            usersBet,
            (['red', 'black'].includes(usersBet) ? rouletteColor : rouletteOutcome) + '',
            amountToBet,
            user.balance
        );
    }
}

function isCorrectBet(argument: any): FriendlyError | void {
    const isCorrect = argument == 'red' || argument == 'black' ||
        (Number.isInteger(+argument) && +argument >= 0 && +argument < 37);
    if(!isCorrect) return new FriendlyError('Bet has to be red, black or a number between 1 and 36');
}

function createReturnEmbed(didWin: boolean, username: string, userBet: string, outcome: string, prize: number, balance: number): MessageEmbed {
    return new MessageEmbed()
        .setTitle(`${username} you ${didWin ? 'won' : 'lost'}`)
        .addField(
            `You ${didWin ? 'won' : 'lost'}! You guessed ${userBet} and the outcome was ${outcome}`,
            `You ${didWin ? 'won' : 'lost'} ${prize}. You now have ${balance}.`
        )
        .setColor(didWin ? '#42e330' : '#c91010');
}
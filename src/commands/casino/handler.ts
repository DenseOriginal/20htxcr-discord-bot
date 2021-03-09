import { Handler } from "discord-framework";
import { BalanceCommand } from "./balance";
import { BegCommand } from "./beg";
import { BetCommand } from "./roulette";
import "./bet.argumenttype";

@Handler({
    name: 'casino',
    commands: [BalanceCommand, BetCommand, BegCommand],
    description: 'Casino commands'
})
export class RouletteHandler {}
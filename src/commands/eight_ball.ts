import { Action, Command } from "discord-framework";

const responses = [
    "As I see it, yes.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don’t count on it.",
    "It is certain.",
    "It is decidedly so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Reply hazy, try again.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes – definitely.",
    "You may rely on it.",
]

@Command({
    name: '8ball',
    arguments: [{ key: 'responses', type: 'integer', optional: true }],
    description: 'Wisdom of the magic 8 Ball'
})
export class EightBallCommand implements Action {
    action({ args }) {
        return Array.from({ length: args.responses ||1 }, () => responses[~~(Math.random() * responses.length)]).join('\n');
    }
}
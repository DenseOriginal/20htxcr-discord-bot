import { Action, Command } from "discord-framework";

@Command({
    name: 'mock',
    alias: ['spongebob', 'Губка'],
    arguments: [{ key: 'textToMock', type: 'string', rest: true }],
    description: 'Mocks any text'
})
export class MockingCommand implements Action {
    action({ args }) {
        const text: string = args.textToMock.join(' ');
        return text.split('').map(char => Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase()).join('');
    }
}
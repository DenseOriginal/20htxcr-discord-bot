import { Action, Command } from "discord-framework";

@Command({
    name: 'test',
    alias: ['ping'],
    arguments: [
        { key: 'adsd', type: 'string' },
        { key: 'adsdsad', type: 'string' },
    ],
    description: 'Test command'
})
export class TestCommand implements Action {
    action() {
        return 'Yee haw 🤠';
    }
}
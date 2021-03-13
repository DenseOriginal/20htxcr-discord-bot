import { Action, ActionContext, Command } from "discord-framework";
import fetch from "node-fetch";

@Command({
    name: 'obama',
    arguments: [{ key: 'textToSay', type: 'string' }],
    description: 'Makes obama say anything'
})
export class TalkObamaCommand implements Action {
    async action({ args }: ActionContext) {
        const textToSay: string = args.textToSay;
        if(textToSay.length > 280) return 'Message cannot be more than 280 characters';
        const res = await fetch('http://talkobamato.me/synthesize.py', {
            method: 'post',
            body: `input_text=${textToSay}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        const speechKey = res.url.split('speech_key=')[1];
        const videoLink = `http://talkobamato.me/synth/output/${speechKey}/obama.mp4`;
        return videoLink;
    }
}
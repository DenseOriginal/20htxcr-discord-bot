import { FriendlyError } from "discord-framework";
import { AuthFunction } from "discord-framework/lib/utils/authentication";
import { Message } from "discord.js";

interface ThrottleUser {
    firstUsage: number;
    usages: number;
}

export function throttle(duration: number, usages = 1): AuthFunction {
    const throttledUsers = new Map<string, ThrottleUser>()

    return (message: Message): FriendlyError | void => {
        const userID = message.author.id;
        const userInMap = throttledUsers.get(userID);
        
        if(userInMap) {
            // If the user exist in the throttle map
            // Check if the user has used all their uses
            // If they have then tell them to wait
            // Otherwise increase the usages and allow their command

            const timeLeft = (userInMap.firstUsage + duration - Date.now()) / 1000
            if(userInMap.usages >= usages) return new FriendlyError(`Du skal vente ${timeLeft.toFixed(1)} sekunder før du kan bruge denne command igen`);
            userInMap.usages++;
        } else {
            // If the user doesnt exist in the throttle map
            // Put them in the throttle map
            // And remove them after the duration is over

            throttledUsers.set(userID, {
                firstUsage: Date.now(),
                usages: 1
            });

            setTimeout(() => throttledUsers.delete(userID), duration);
        }
    }
}
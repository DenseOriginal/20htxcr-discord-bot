import { User } from "discord.js";

export interface Poll {
    id: number;
    description: string;
    author: User;
    creationTime: Date;
    expiration?: Date;
    yes: User[];
    no: User[];
}

export const polls: Poll[] = [];
export const findPoll = (pollId: number) => polls.find(poll => poll.id == pollId);

import { Service } from "discord-framework";

export interface RouletteUser {
    id: string,
    balance: number,
}

@Service()
export class RouletteService {
    users: RouletteUser[] = [];

    getUser(id: string): RouletteUser {
        let foundUser = this.users.find(user => user.id == id);
        if (!foundUser) {
            const newUser = {
                id,
                balance: 1000
            };

            this.users.push(newUser);
            return newUser;
        }
        return foundUser;
    }

    incrementBalance(id: string, amount: number) {
        let foundUser = this.getUser(id);
        foundUser.balance += amount;
    }
}
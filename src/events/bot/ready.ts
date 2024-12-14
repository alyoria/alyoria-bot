import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Logger } from "../../utils/Logger";

export class Ready extends Event {
    constructor(client: ShewenyClient) {
        super(client, "ready", {
            description: "Client is ready",
            once: true,
        });
    }

    async execute() {
        Logger.log("info", `Logged in as ${this.client.user?.username}`);
    }
}
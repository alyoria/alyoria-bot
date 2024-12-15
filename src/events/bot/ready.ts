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

        (await this.client.guilds.fetch('1205816859316981780')).channels.fetch('1317860802992017418').then(channel => {
            (channel as any).send({
                content: `:white_check_mark: **${this.client.user?.username}** est en ligne à \`\`${new Date().toLocaleTimeString()}\`\` !`,
                embeds: []
            });
        });
    }
}
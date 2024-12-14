import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'ping',
            description: 'Vérifie la latence du bot',
            category: 'Public',
            type: 'SLASH_COMMAND'
        });
    };

    async execute(interaction: CommandInteraction) {
        await interaction.reply({ content: `🏓 Pong! ${this.client.ws.ping}ms`, ephemeral: true });
    }
}
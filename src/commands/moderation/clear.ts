import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ApplicationCommandOptionType, CommandInteraction, PermissionFlagsBits, TextChannel } from "discord.js";

export class ClearCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'clear',
            description: 'Permet de supprimer des messages',
            category: 'Moderation',
            userPermissions: [
                PermissionFlagsBits.ManageMessages
            ],
            type: 'SLASH_COMMAND',
            options: [
                {
                    name: 'nombre',
                    description: 'Le nombre de messages à supprimer',
                    type: ApplicationCommandOptionType.Integer,
                    maxValue: 99,
                    minValue: 1,
                    required: true,
                }
            ]
        });
    };

    async execute(interaction: CommandInteraction) {
        const amount = interaction.options.get('nombre', true).value as number;

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: 'You can only delete between 1 and 100 messages.',
                ephemeral: true,
            });
        }

        const channel = interaction.channel;

        if (!channel || !channel.isTextBased()) {
            return interaction.reply({
                content: 'This command can only be used in text-based channels.',
                ephemeral: true,
            });
        }

        try {
            const messages = await (channel as TextChannel).bulkDelete(amount, true);
            return interaction.reply({
                content: `Successfully deleted ${messages.size} messages.`,
                ephemeral: true,
            });
        } catch (error) {
            console.error('Error clearing messages:', error);
            return interaction.reply({
                content: 'There was an error while trying to clear messages.',
                ephemeral: true,
            });
        }
    }
}

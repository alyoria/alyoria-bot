import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, CommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export class TicketCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'ticket',
            description: 'Envoie l\'embed des tickets',
            category: 'Moderation',
            userPermissions: [
              PermissionFlagsBits.Administrator  
            ],
            type: 'SLASH_COMMAND'
        });
    };

    async execute(interaction: CommandInteraction) {
        const openButton = new ButtonBuilder({
            custom_id: 'open_ticket',
            label: 'Ouvrir un ticket',
            emoji: '🎫',
            style: ButtonStyle.Success
        });

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(openButton);

        const ticketsEmbed = new EmbedBuilder({
            title: '🎫 Tickets',
            description: `Pour ouvrir un ticket, appuyez sur le bouton ci-dessous.`,
            color: Colors.DarkButNotBlack,
            timestamp: new Date(),
            footer: {
                text: `Alyoria © 2024`,
                icon_url: this.client.user?.displayAvatarURL()
            }
        });

        await interaction.reply({ embeds: [ticketsEmbed], components: [row] });
    }
}
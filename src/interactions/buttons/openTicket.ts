import { Button, ShewenyClient } from "sheweny";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Colors, PermissionFlagsBits, type ButtonInteraction } from "discord.js";

export class TicketsButton extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["open_ticket"]);
    }

    async execute(button: ButtonInteraction) {
        if (button.guild?.channels.cache.some(channel => channel.name === `ticket-${button.user.username}`)) {
            return button.reply({
                content: "Vous avez déjà un ticket ouvert !",
                ephemeral: true
            });
        }

        const channel = button.guild?.channels.create({
            name: `ticket-${button.user.username}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: button.guild.roles.everyone,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                },
                {
                    id: button.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                }
            ]
        });

        if (channel == null) {
            return button.reply({
                content: "Une erreur est survenue lors de la création du ticket.",
                ephemeral: true
            });
        };

        if (channel == null || (await channel).type !== ChannelType.GuildText) return;

        const lockButton = new ButtonBuilder({
            custom_id: 'lock_ticket',
            label: 'Fermer le ticket',
            emoji: '🔒',
            style: ButtonStyle.Secondary
        })

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(lockButton);

        (await channel).send({
            content: `<@${button.user.id}>`,
            embeds: [
                {
                    title: 'Ticket de ' + button.user.username,
                    description: `> Nous vous demandons d'être patient, et de ne pas mentionner les membres du staff, il prendront votre ticket en charge dès qu'ils le pourront.`,
                    color: Colors.DarkButNotBlack,
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: `Alyoria © 2024`,
                        icon_url: this.client.user?.displayAvatarURL()
                    }
                }
            ],
            components: [row]
        })

        await button.reply({
            content: `Votre ticket a été créé dans le salon <#${(await channel).id}> !`,
            ephemeral: true
        })
    }
}
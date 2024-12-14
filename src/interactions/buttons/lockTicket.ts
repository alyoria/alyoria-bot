import { Button, ShewenyClient } from "sheweny";
import { ChannelType, PermissionFlagsBits, type ButtonInteraction } from "discord.js";

export class TicketsButton extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["lock_ticket"]);
    }

    async execute(button: ButtonInteraction) {
        if (button.channel?.type !== ChannelType.GuildText) return;
        if (!button.channel.name.startsWith('ticket-')) {
            return button.reply({
                content: 'Ce ticket a déjà été fermé !',
                ephemeral: true
            })
        };

        if (!button.guild) return;

        button.channel.edit({
            name: `fermé-${button.user.username}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: button.guild.roles.everyone,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                },
                {
                    id: button.user.id,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                }
            ]
        });

        await button.reply({
            content: "Ce ticket a été fermé par <@" + button.user.id + "> !"
        });
    }
}
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ChannelType, Colors, EmbedBuilder, Events, Message } from "discord.js";

export class MemberJoin extends Event {
    constructor(client: ShewenyClient) {
        super(client, Events.MessageDelete, {
            description: "Event when a message is deleted",
        });
    }

    async execute(message: Message) {
        const content = message.content;
        const guild = message.guild;

        if (!content) return;
        if (!guild) return;

        const logsChannel = await guild.channels.fetch('1218219464320094339')
        if (!logsChannel || logsChannel.type !== ChannelType.GuildText) return;

        const logEmbed = new EmbedBuilder({
            title: '💬 Logs Messages',
            description: `Un message a été supprimé.`,
            timestamp: new Date(),
            color: Colors.DarkButNotBlack,
            fields: [
                {
                    name: 'Autheur',
                    value: `<@${message.author.id}>`,
                    inline: true
                },
                {
                    name: 'Message',
                    value: `\`\`${content}\`\``,
                    inline: true
                }
            ],
            footer: {
                text: 'Alyoria © 2024',
                icon_url: this.client.user?.displayAvatarURL() || undefined
            }
        })

        logsChannel.send({
            embeds: [logEmbed]
        });
    }
}
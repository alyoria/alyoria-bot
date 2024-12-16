import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ChannelType, Colors, EmbedBuilder, Events, Message } from "discord.js";

export class MemberJoin extends Event {
    constructor(client: ShewenyClient) {
        super(client, Events.MessageUpdate, {
            description: "Event when a message is updated",
        });
    }

    async execute(oldMessage: Message, newMessage: Message) {
        const oldContent = oldMessage.content;
        const newContent = newMessage.content;
        const guild = newMessage.guild;

        if (!oldContent) return;
        if (!newContent) return;
        if (!guild) return;

        const logsChannel = await guild.channels.fetch('1218219464320094339')
        if (!logsChannel || logsChannel.type !== ChannelType.GuildText) return;

        const logEmbed = new EmbedBuilder({
            title: '💬 Logs Messages',
            description: `Message de <@${newMessage.author.id}> édité.`,
            timestamp: new Date(),
            color: Colors.DarkButNotBlack,
            fields: [
                {
                    name: 'Ancien message',
                    value: `\`\`${oldContent}\`\``,
                    inline: true
                },
                {
                    name: 'Nouveau message',
                    value: `\`\`${newContent}\`\``,
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
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ChannelType, Colors, EmbedBuilder, Events, GuildMember } from "discord.js";

export class MemberJoin extends Event {
    constructor(client: ShewenyClient) {
        super(client, Events.GuildMemberRemove, {
            description: "Event when a member leave a guild",
        });
    }

    async execute(member: GuildMember) {
        if (member.guild.id !== '1020405855277023273') return; // Only on Heaven

        const guild = member.guild;
        if (!guild) return;

        const embed = new EmbedBuilder({
            title: '😭 Un membre nous a quitté !',
            description: `**${member.user.username}** a quitté le serveur, à bientôt !`,
            color: Colors.DarkButNotBlack,
            timestamp: new Date(),
            footer: {
                text: 'Alyoria © 2024',
                icon_url: this.client.user?.displayAvatarURL() || undefined
            }
        });

        const departureChannel = guild.channels.cache.get('1056394183390277712')
        if (!departureChannel || departureChannel.type !== ChannelType.GuildText) return;

        departureChannel.send({
            embeds: [embed]
        });

        const logsChannel = await guild.channels.fetch('1218219464320094339')
        if (!logsChannel || logsChannel.type !== ChannelType.GuildText) return;

        const logEmbed = new EmbedBuilder({
            title: '👤 Logs Membres',
            description: `**${member.user.username}** a quitté le serveur.`,
            timestamp: new Date(),
            color: Colors.DarkButNotBlack,
            fields: [
                {
                    name: 'ID',
                    value: member.id,
                    inline: true
                },
                {
                    name: 'Avait rejoint le',
                    value: member.guild.joinedAt?.toLocaleDateString() || 'Inconnu',
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
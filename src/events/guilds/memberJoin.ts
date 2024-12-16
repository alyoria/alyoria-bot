import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ChannelType, Colors, EmbedBuilder, Events, GuildMember } from "discord.js";

export class MemberJoin extends Event {
    constructor(client: ShewenyClient) {
        super(client, Events.GuildMemberAdd, {
            description: "Event when a member join a guild",
        });
    }

    async execute(member: GuildMember) {
        if (member.guild.id !== '1020405855277023273') return; // Only on Heaven

        const guild = member.guild;
        if (!guild) return;
        
        const messages = [
            `Souhaitons la bienvenue à **${member.user.username}** sur le serveur !`,
            `**${member.user.username}** est arrivé de loin !`,
            `Bienvenue **${member.user.username}**, tu m'as apporté des cookies ?`,
            `3, 2, 1, **${member.user.username}** est arrivé !`
        ]

        const globalChannel = guild.channels.cache.get('1056394219289313310')
        if (!globalChannel || globalChannel.type !== ChannelType.GuildText) return;

        globalChannel.send(messages[Math.floor(Math.random() * messages.length)]);

        const embed = new EmbedBuilder({
            title: '👋 Un nouveau membre !',
            description: `Souhaitons la bienvenue à **${member.user.username}** sur le serveur !\n
            > Avant toutes choses, je t'invite à lire les règles dans <#1056394180378767440> et a récupérer tes derniers rôles dans <#1056394209663385611>.\n
            Si tu as la moindre question, n'hésite pas à demander à un membre du staff !`,
            color: Colors.DarkButNotBlack,
            timestamp: new Date(),
            footer: {
                text: 'Alyoria © 2024',
                icon_url: this.client.user?.displayAvatarURL() || undefined
            }
        });

        const welcomeChannel = guild.channels.cache.get('1056394183390277712')
        if (!welcomeChannel || welcomeChannel.type !== ChannelType.GuildText) return;

        welcomeChannel.send({
            content: `<@${member.id}>`,
            embeds: [embed]
        });

        const logsChannel = await guild.channels.fetch('1218219464320094339')
        if (!logsChannel || logsChannel.type !== ChannelType.GuildText) return;

        const logEmbed = new EmbedBuilder({
            title: '👤 Logs Membres',
            description: `**${member.user.username}** a rejoint le serveur.`,
            timestamp: new Date(),
            color: Colors.DarkButNotBlack,
            fields: [
                {
                    name: 'ID',
                    value: member.id,
                    inline: true
                },
                {
                    name: 'Compte créé le',
                    value: member.user.createdAt.toLocaleDateString(),
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
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ChannelType, Colors, EmbedBuilder, Events, GuildMember } from "discord.js";

export class MemberJoin extends Event {
    constructor(client: ShewenyClient) {
        super(client, Events.GuildMemberUpdate, {
            description: "Event when a member is updated",
        });
    }

    async execute(oldMember: GuildMember, newMember: GuildMember) {
        if (newMember.guild.id !== '1020405855277023273') return; // Only on Heaven

        const guild = newMember.guild;
        if (!guild) return;

        const roles = newMember.roles.cache
            .filter(role => role.id !== guild.id)
            .map(role => `<@&${role.id}>`)
            .join(', ')
            .substring(0, 1024);

        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id))
            .map(role => `<@&${role.id}>`).join(', ');

        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id))
            .map(role => `<@&${role.id}>`).join(', ');

        const logsChannel = await guild.channels.fetch('1218219464320094339')
        if (!logsChannel || logsChannel.type !== ChannelType.GuildText) return;

        const logEmbed = new EmbedBuilder({
            title: '👤 Logs Membres',
            description: `Rôles de **${newMember.user.username}** mis à jour.`,
            timestamp: new Date(),
            color: Colors.DarkButNotBlack,
            fields: [
                {
                    name: `Rôle(s) ${addedRoles ? 'Ajouté(s)' : 'Supprimé(s)'}`,
                    value: `${addedRoles || removedRoles || 'Aucun changement'}`
                },
                {
                    name: 'Liste des rôles',
                    value: `${roles || 'Aucun rôle'}`
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
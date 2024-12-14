import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Logger } from "../../utils/Logger";
import { ChannelType, Colors, EmbedBuilder, Events, Interaction, InteractionType } from "discord.js";

export class Ready extends Event {
    constructor(client: ShewenyClient) {
        super(client, Events.InteractionCreate, {
            description: "Interaction creations"
        });
    }

    async execute(interaction: Interaction) {
        const guild = await this.client.guilds.fetch('1205816859316981780');
        
        if (interaction.type === InteractionType.ApplicationCommand) {
            const channel = await guild.channels.fetch('1317615235301113936');

            if (channel == null || channel.type !== ChannelType.GuildText) return;

            const cmdName = interaction.commandName;
            const cmdGuild = interaction.guild;
            const cmdUser = interaction.user;
            
            const embed = new EmbedBuilder({
                title: 'Commande exécutée',
                description: `Une commande a été exécutée par ${cmdUser} dans le serveur \`\`${cmdGuild?.name}\`\``,
                fields: [
                    {
                        name: 'Nom',
                        value: '/' + cmdName.trimStart(),
                        inline: true
                    },
                    {
                        name: 'Utilisateur',
                        value: `<@${cmdUser?.id}>`,
                        inline: true
                    },
                    {
                        name: 'Serveur',
                        value: `${cmdGuild?.name}`,
                        inline: true
                    }
                ],
                color: Colors.DarkButNotBlack,
                timestamp: new Date(),
                footer: {
                    text: `Alyoria © 2024`,
                    icon_url: this.client.user?.displayAvatarURL()
                }
            });

            await channel.send({ embeds: [embed] });
            return Logger.log("info", `Commande exécutée -> /${cmdName}`);
        }
    }
}
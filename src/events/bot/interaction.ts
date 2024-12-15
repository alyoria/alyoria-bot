import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Logger } from "../../utils/Logger";
import { ChannelType, Events, Interaction, InteractionType } from "discord.js";

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
            
            (await this.client.guilds.fetch('1205816859316981780')).channels.fetch('1317615235301113936').then(channel => {
                (channel as any).send({
                    content: `🤖 Commande \`\`/${cmdName}\`\` exécutée par <@${cmdUser.id}> dans **${cmdGuild?.name}** à \`\`${new Date().toLocaleTimeString()}\`\` !`	,
                    embeds: []
                });
            });
            return Logger.log("info", `Commande exécutée -> /${cmdName}`);
        }
    }
}
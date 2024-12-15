import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ApplicationCommandOptionType, ChannelType, Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export class BugreportCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'bugreport',
            description: 'Permet de reporter un bug',
            category: 'Public',
            type: 'SLASH_COMMAND',
            options: [
                {
                    name: 'message',
                    description: 'Le bug à reporter',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        });
    };

    async execute(interaction: CommandInteraction) {
        const message = interaction.options.get('message', true).value as string;

        (await this.client.guilds.fetch('1205816859316981780')).channels.fetch('1317615277751668807').then(async (channel) => {
            const bugEmbed = new EmbedBuilder({
                title: "🐞 Bug report",
                description: message,
                color: Colors.DarkButNotBlack,
                footer: {
                    text: `Alyoria © 2024`,
                    icon_url: this.client.user?.displayAvatarURL() || undefined
                },
                timestamp: new Date()
            });

            if (!interaction.channel || interaction.channel.type !== ChannelType.GuildText) {
                return interaction.reply({ content: 'Cette commande ne peut être utilisée que dans un salon texte.', ephemeral: true });
            }

            await (channel as any).send({ embeds: [bugEmbed] });
            return interaction.reply({ content: 'Votre bug a bien été reporté.', ephemeral: true });
        });
    }
}
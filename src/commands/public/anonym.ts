import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ApplicationCommandOptionType, ChannelType, Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export class AnonymCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'anonym',
            description: 'Permet d\'envoyer un message anonyme',
            category: 'Public',
            type: 'SLASH_COMMAND',
            options: [
                {
                    name: 'message',
                    description: 'Le message à envoyer',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        });
    };

    async execute(interaction: CommandInteraction) {
        const message = interaction.options.get('message', true).value as string;

        if (interaction.guild?.id === '1020405855277023273') {
            if (interaction.channel?.id !== '1223674596381692085' ) {
                return interaction.reply({
                    content: 'Vous ne pouvez pas utiliser cette commande dans ce salon.',
                    ephemeral: true
                });
            }
        }

        if (message.includes('@everyone') || message.includes('@here')) {
            return interaction.reply({
                content: 'Vous ne pouvez pas mentionner @everyone ou @here dans un message anonyme.',
                ephemeral: true
            });
        }

        const anonymEmbed = new EmbedBuilder({
            title: "📩 Message anonyme",
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

        const userMentions = message.match(/<@!?\d+>/g);
        let mentionsContent = '';

        if (userMentions) {
            const mentions = userMentions
                .map(mention => {
                    const userId = mention.match(/\d+/)?.[0];
                    return userId ? `<@${userId}>` : null;
                })
                .filter(Boolean)
                .join(' ');

            if (mentions) {
                mentionsContent = mentions;
            }
        }

        await interaction.channel.send({
            content: mentionsContent || '',
            embeds: [anonymEmbed]
        });

        return interaction.reply({ content: 'Message envoyé !', ephemeral: true });
    }
}
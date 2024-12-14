import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export class InviteCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'invite',
            description: 'Envoie le liens d\'invitation du bot',
            category: 'Public',
            type: 'SLASH_COMMAND'
        });
    };

    async execute(interaction: CommandInteraction) {
        const inviteEmbed = new EmbedBuilder({
            title: "📩 Invitations",
            description: `- [Rejoindre le serveur de support](https://discord.gg/94uKvCx8Zd) \n- [Inviter le bot](https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=8&scope=bot%20applications.commands)`,
            color: Colors.DarkButNotBlack,
            footer: {
                text: `Alyoria © 2024`,
                icon_url: this.client.user?.displayAvatarURL()
            },
            timestamp: new Date()
        });

        await interaction.reply({ embeds: [inviteEmbed] });
    }
}
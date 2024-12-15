import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, EmbedBuilder, Colors } from "discord.js";
import fs from "fs";
import path from "path";

export class HelpCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'help',
            description: 'Affiche les commandes disponibles du bot',
            category: 'Public',
            type: 'SLASH_COMMAND',
        });
    }

    async execute(interaction: CommandInteraction) {
        const commandsPath = path.join(__dirname);

        let commandFiles;
        try {
            commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        } catch (error) {
            console.error("Erreur lors de la lecture des fichiers de commandes :", error);
            return interaction.reply({
                content: "Une erreur est survenue lors de la récupération des commandes.",
                ephemeral: true
            });
        }

        if (!commandFiles || commandFiles.length === 0) {
            return interaction.reply({
                content: "Aucune commande n'est actuellement disponible.",
                ephemeral: true
            });
        }

        let description = "";

        commandFiles.forEach(file => {
            const commandName = path.parse(file).name;
            description += `- \`/${commandName}\`\n`;
        });

        const helpEmbed = new EmbedBuilder()
            .setTitle("📜 Liste des commandes disponibles")
            .setDescription(description)
            .setColor(Colors.Blurple)
            .setFooter({
                text: `Alyoria © 2024`,
                iconURL: this.client.user?.displayAvatarURL() || undefined
            })
            .setTimestamp();

        return interaction.reply({
            embeds: [helpEmbed]
        });
    }
}

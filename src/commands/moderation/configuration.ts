import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ApplicationCommandOptionType, CommandInteraction, PermissionFlagsBits, TextChannel } from "discord.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ConfigCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'configuration',
            description: 'Permet de configurer le bot',
            category: 'Moderation',
            userPermissions: [
                PermissionFlagsBits.Administrator
            ],
            type: 'SLASH_COMMAND',
            options: [
                {
                    name: 'prefix',
                    description: 'Le prefix des commandes du bot (défaut a!)',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: 'logs_statut',
                    description: 'Active ou désactive les logs',
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
                {
                    name: 'tickets_statut',
                    description: 'Active ou désactive les tickets',
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
                {
                    name: 'anonym_statut',
                    description: 'Active ou désactive les messages anonymes',
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
                {
                    name: 'logs',
                    description: 'Définit le salon des logs',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'tickets_logs',
                    description: 'Définit le salon des logs des tickets',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'anonym_logs',
                    description: 'Définit le salon de logs des anonymes',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'welcome',
                    description: 'Définit le salon des bienvenues',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'departures',
                    description: 'Définit le salon des départs',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'rules',
                    description: 'Définit le salon du règlement',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'announcements',
                    description: 'Définit le salon des annonces',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'discussions',
                    description: 'Définit le salon des disussions (utilisé pour les alerts de bienvenues)',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'anonym',
                    description: 'Définit le salon où peut être utilisé la commande anonyme',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'autovocal',
                    description: 'Définit le salon où les salons vocaux temporaires seront créés',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'open_tickets',
                    description: 'Définit la catégorie où seront créés les tickets',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: 'close_tickets',
                    description: 'Définit la catégorie où seront archivés les tickets',
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ]
        });
    };

    async execute(interaction: CommandInteraction) {
        const guild = interaction.guild;
        if (!guild) return;

        const prefix = interaction.options.get('prefix', true).value as string;
        const logs_statut = interaction.options.get('logs_statut', true).value as boolean;
        const tickets_statut = interaction.options.get('tickets_statut', true).value as boolean;
        const anonym_statut = interaction.options.get('anonym_statut', true).value as boolean;
        const logs = interaction.options.get('logs', true).channel as TextChannel;
        const tickets_logs = interaction.options.get('tickets_logs', true).channel as TextChannel;
        const anonym_logs = interaction.options.get('anonym_logs', true).channel as TextChannel;
        const welcome = interaction.options.get('welcome', true).channel as TextChannel;
        const departures = interaction.options.get('departures', true).channel as TextChannel;
        const rules = interaction.options.get('rules', true).channel as TextChannel;
        const announcements = interaction.options.get('announcements', true).channel as TextChannel;
        const discussions = interaction.options.get('discussions', true).channel as TextChannel;
        const anonym = interaction.options.get('anonym', true).channel as TextChannel;
        const autovocal = interaction.options.get('autovocal', true).channel as TextChannel;
        const open_tickets = interaction.options.get('open_tickets', true).channel as TextChannel;
        const close_tickets = interaction.options.get('close_tickets', true).channel as TextChannel;

        // Save in database
        try {
            await prisma.guildsSettings.update({
                data: {
                    prefix: prefix,
                    logsEnabled: logs_statut,
                    ticketsEnabled: tickets_statut,
                    anonymEnabled: anonym_statut,
                    logsChannel: logs.id,
                    ticketsLogsChannel: tickets_logs.id,
                    anonymLogsChannel: anonym_logs.id,
                    arrivalsChannel: welcome.id,
                    departuresChannel: departures.id,
                    rulesChannel: rules.id,
                    announcementsChannel: announcements.id,
                    discussionsChannel: discussions.id,
                    anonymChannel: anonym.id,
                    autoVocalChannel: autovocal.id,
                    openTicketCategory: open_tickets.id,
                    closeTicketCategory: close_tickets.id,
                },
                where: {
                    guildId: guild.id,
                }
            });

            return interaction.reply({
                content: 'Configuration effectuée avec succès',
                ephemeral: true,
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Une erreur est survenue lors de la configuration',
                ephemeral: true,
            });
        }
    }
}

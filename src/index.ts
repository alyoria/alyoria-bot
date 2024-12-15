import { ShewenyClient } from "sheweny";
import { Config } from "./interfaces/Config";
import { ActivityType, GatewayIntentBits, Partials, PermissionFlagsBits } from "discord.js";
import dotenv from 'dotenv';
dotenv.config();

const constants = require("./utils/Constants");

declare module "sheweny" {
    interface ShenewyClient {
        config: Config;
    }
}

class Client extends ShewenyClient {
    readonly config: Config = constants;

    constructor() {
        super({
            admins: constants.owners,
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember
            ],
            presence: {
                activities: [{
                    name: process.env.NODE_ENV === 'development'
                        ? 'la maintenance !'
                        : '/invite | by @plhume',
                    type: process.env.NODE_ENV === 'development'
                        ? ActivityType.Watching
                        : ActivityType.Playing
                }],
                status: process.env.NODE_ENV === 'development'
                    ? 'dnd'
                    : 'online'
            },
            joinThreadsOnCreate: true,
            mode: "development",
            managers: {
                commands: {
                    directory: './commands',
                    prefix: '*',
                    applicationPermissions: true,
                    default: {
                        userPermissions: [PermissionFlagsBits.UseApplicationCommands]
                    }
                },
                events: {
                    directory: './events'
                },
                buttons: {
                    directory: './interactions/buttons'
                },
                selectMenus: {
                    directory: './interactions/selectMenus'
                }
            }
        });

        this.login(process.env.TOKEN);
    }
}

new Client();
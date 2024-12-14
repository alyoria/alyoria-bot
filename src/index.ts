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
                    name: '*invite | by @plhume',
                    type: ActivityType.Playing
                }]
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
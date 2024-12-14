import { ColorResolvable } from "discord.js";

export interface Config {
    owners: string[];
    channels: {
        logs: string;
        anynomLogs: string;
        ticketsLogs: string;
    };
    colors: {
        default: ColorResolvable;
        error: ColorResolvable;
        success: ColorResolvable;
        warning: ColorResolvable;
    }
}
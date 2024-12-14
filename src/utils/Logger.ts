import chalk from 'chalk';

export type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
    public static log(level: LogLevel, message: string): void {
        switch (level) {
        case "debug":
            console.log(chalk.blueBright(`[DEBUG] ${message}`));
            break;
        case "info":
            console.log(chalk.whiteBright(`[INFO] ${message}`));
            break;
        case "warn":
            console.log(chalk.yellowBright(`[WARN] ${message}`));
            break;
        case "error":
            console.log(chalk.redBright(`[ERROR] ${message}`));
            break;
        default:
            console.log(chalk.whiteBright(`[${level}] ${message}`));
            break;
        }
    }
}
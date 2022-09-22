import "reflect-metadata";
import "dotenv/config";

import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";

export default class Bot {

  constructor(token: string) {

    const bot = new Client({
      // To only use global commands (use @Guild for specific guild command), comment this line
      botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  
      // Discord intents
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildPresences
      ],
  
      // Debug logs are disabled in silent mode
      silent: false,
  
      // Configuration for @SimpleCommand
      simpleCommand: {
        prefix: "!",
      },
    });
  
    bot.once("ready", async () => {
      // Make sure all guilds are cached
      await bot.guilds.fetch();
  
      // Synchronize applications commands with Discord
      await bot.initApplicationCommands();
  
      // To clear all guild commands, uncomment this line,
      // This is useful when moving from guild commands to global commands
      // It must only be executed once
      //
      //  await bot.clearApplicationCommands(
      //    ...bot.guilds.cache.map((g) => g.id)
      //  );
  
      console.log("Bot started");
    });
  
    bot.on("interactionCreate", (interaction: Interaction) => {
      bot.executeInteraction(interaction);
    });
  
    bot.on("messageCreate", (message: Message) => {
      bot.executeCommand(message);
    });
  
    async function run() {
      // The following syntax should be used in the commonjs environment
      //
      // await importx(__dirname + "/{events,modules}/**/*.{ts,js}");
  
      // The following syntax should be used in the ECMAScript environment
      await importx(dirname(import.meta.url) + "/modules/**/{events,commands}/**/*.{ts,js}");
  
      // Let's start the bot
      if (!token) {
        throw Error("Could not find BOT_TOKEN in your environment");
      }
  
      // Log in with your bot token
      await bot.login(token);
    }
    run();

  }

}

if (process.env.BOT_TOKEN1) new Bot(process.env.BOT_TOKEN1)
if (process.env.BOT_TOKEN2) new Bot(process.env.BOT_TOKEN2)
if (process.env.BOT_TOKEN3) new Bot(process.env.BOT_TOKEN3)
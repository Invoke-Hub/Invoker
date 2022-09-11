import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";
import CRetrieveAgent from "../controllers/CRetrieveAgent.js";

/**
 * A class that retrieves the valorant agent profile
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays the valorant profile", name: "valorant" })
@SlashGroup("valorant")
export abstract class CAgent {

    /**
     * Executes the valorant agent profile embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "agent", description: "Displays valorant user agent" })
    async profile(
        @SlashOption({ name: "name", description: "player name" })
        playerName: string,
        @SlashOption({ name: "tagline", description: "player tagline" })
        playerTagLine: string,
        @SlashChoice({ name: "Asia Pacific", value: "ap" })
        @SlashChoice({ name: "Brazil", value: "br" })
        @SlashChoice({ name: "Europe", value: "eu" })
        @SlashChoice({ name: "Korea", value: "kr" })
        @SlashChoice({ name: "Latin America", value: "latam" })
        @SlashChoice({ name: "North America", value: "na" })
        @SlashOption({ name: "region", description: "What region?" })
        playerRegion: string,
        @SlashChoice({ name: "Escalation", value: "escalation" })
        @SlashChoice({ name: "Spike Rush", value: "spikerush" })
        @SlashChoice({ name: "Death Match", value: "deathmatch" })
        @SlashChoice({ name: "Competitive", value: "competitive" })
        @SlashChoice({ name: "Unrated", value: "unrated" })
        @SlashChoice({ name: "Replication", value: "replication" })
        @SlashChoice({ name: "Snowball", value: "snowball" })
        @SlashChoice({ name: "Custom", value: "custom" })
        @SlashOption({ name: "mode", description: "What game mode?" })
        mode: string,
        interaction: CommandInteraction
    ): Promise<void> {
        await interaction.deferReply()

        new CRetrieveAgent({
            name: playerName,
            tag: playerTagLine,
            region: playerRegion,
        }, new CEmbedBuilder({
            interaction: interaction
        })).execute(mode).then(api => api.embed.sendMessage())
    }
}
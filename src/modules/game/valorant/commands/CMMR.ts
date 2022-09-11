import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";
import CRetrieveMMR from "../controllers/CRetrieveMMR.js";

/**
 * A class that retrieves the valorant MMR profile
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays the valorant competitive mmr", name: "valorant" })
@SlashGroup("valorant")
export abstract class CMMR {

    /**
     * Executes the valorant MMR profile embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "mmr", description: "Displays valorant user mmr" })
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
        interaction: CommandInteraction
    ): Promise<void> {
        await interaction.deferReply()

        new CRetrieveMMR({
            name: playerName,
            tag: playerTagLine,
            region: playerRegion,
        }, new CEmbedBuilder({
            interaction: interaction
        })).execute().then(api => api.embed.sendMessageWithFile())
    }
}
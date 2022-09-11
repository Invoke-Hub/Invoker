import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import CRetrieveCrypto from "../controllers/CRetrieveCrypto.js";

/**
 * A class that retrieves the wemix currency
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays information about the wemix currency", name: "currency" })
@SlashGroup("currency")
export abstract class CWemix {

    /**
     * Executes the wemix embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "wemix", description: "Displays current Wemix rate" })
    async wemix(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply()

        interaction.client.channels.fetch(`${interaction.channelId}`).then(async (channel) => {
            new CRetrieveCrypto({
                id: "wemix-token",
                botId: "913757627769552918",
                name: "WEMIX",
                color: "#0000FF",
                image: "wemix.png",
                channel: interaction.channelId,
                url: null,
                isEmbed: true
            }, {
                interaction: interaction
            }).retrieveFromCoinGecko(channel, interaction)
        })
    }
}
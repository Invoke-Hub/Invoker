import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import CRetrieveCrypto from "../controllers/CRetrieveCrypto.js";

/**
 * A class that retrieves the axs currency
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays information about the axs currency", name: "currency" })
@SlashGroup("currency")
export abstract class CAxs {

    /**
     * Executes the axs embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "axs", description: "Displays current AXS rate" })
    async axs(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply()

        interaction.client.channels.fetch(`${interaction.channelId}`).then(async (channel) => {
            new CRetrieveCrypto({
                id: "axie-infinity",
                botId: "957696584060113021",
                name: "AXS",
                color: "#0000FF",
                image: "axs.png",
                channel: interaction.channelId,
                url: null,
                isEmbed: true
            }, {
                interaction: interaction
            }).retrieveFromCoinGecko(channel, interaction)
        })
    }
}
import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import CRetrieveCrypto from "../controllers/CRetrieveCrypto.js";

/**
 * A class that retrieves the slp currency
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays information about the crypto currency", name: "currency" })
@SlashGroup("currency")
export abstract class CSlp {

    /**
     * Executes the slp embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "slp", description: "Displays current SLP rate" })
    async slp(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply()

        interaction.client.channels.fetch(`${interaction.channelId}`).then(async (channel) => {
            new CRetrieveCrypto({
                id: "smooth-love-potion",
                botId: "916599306570592297",
                name: "SLP",
                color: "#0000FF",
                image: "slp.png",
                channel: interaction.channelId,
                url: null,
                isEmbed: true
            }, {
                interaction: interaction
            }).retrieveFromCoinGecko(channel, interaction)
        })
    }
}
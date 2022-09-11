import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import CRetrieveCrypto from "../controllers/CRetrieveCrypto.js";

/**
 * A class that retrieves the draco currency
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays information about the draco currency", name: "currency" })
@SlashGroup("currency")
export abstract class CDraco {

    /**
     * Executes the draco embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "draco", description: "Displays current Draco rate" })
    async draco(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply()

        interaction.client.channels.fetch(`${interaction.channelId}`).then(async (channel) => {
            new CRetrieveCrypto({
                id: "Draco",
                botId: "",
                name: "DRACO",
                color: "#0000FF",
                image: "draco.png",
                channel: interaction.channelId,
                url: "https://api.mir4global.com/wallet/prices/draco/lastest",
                isEmbed: true
            }, {
                interaction: interaction
            }).retrieveFromPost(channel, interaction)
        })
    }
}
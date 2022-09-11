import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import CRetrieveCrypto from "../controllers/CRetrieveCrypto.js";

/**
 * A class that retrieves the hydra currency
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
@SlashGroup({ description: "Displays information about the hydra currency", name: "currency" })
@SlashGroup("currency")
export abstract class CHydra {

    /**
     * Executes the hydra embed
     *
     * @param {CommandInteraction} interaction
     */
    @Slash({ name: "hydra", description: "Displays current Hydra rate" })
    async hydra(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply()

        interaction.client.channels.fetch(`${interaction.channelId}`).then(async (channel) => {
            new CRetrieveCrypto({
                id: "Hydra",
                botId: "",
                name: "HYDRA",
                color: "#0000FF",
                image: "draco.png",
                channel: interaction.channelId,
                url: "https://api.mir4global.com/wallet/prices/hydra/lastest",
                isEmbed: true
            }, {
                interaction: interaction
            }).retrieveFromPost(channel, interaction)
        })
    }
}
import { ColorResolvable } from "discord.js";

/**
 * A interface representing crypto properties
 *
 * @author  Devitrax
 * @version 1.0 03/08/22
 */
export interface ICrypto {
    id: string
    botId: string
    name: string
    color: ColorResolvable
    image: string
    channel: string
    url: string | null
    isEmbed: boolean
}
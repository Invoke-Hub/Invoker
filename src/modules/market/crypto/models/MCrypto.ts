import { ICrypto } from "../interfaces/ICrypto";
import { ActivityOptions, ActivityType, AttachmentBuilder, Channel, ClientUser, ColorResolvable, CommandInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { CoinGeckoClient } from "coingecko-api-v3";
import axios, { AxiosResponse } from "axios";
import CLogger from "../../../main/utilities/logbuilder/controllers/CLogBuilder.js";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";

/**
 * A class representing the crypto model
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class MCrypto extends CoinGeckoClient {

    private readonly _currency: ICrypto

    private readonly _embed: CEmbedBuilder

    readonly options = {
        timeout: 10000,
        autoRetry: true,
    }

    constructor(currency: ICrypto, embed: CEmbedBuilder) {
        super()
        this._currency = currency
        this._embed = embed
    }

    public get id(): string {
        return this._currency.id
    }

    public get botId(): string {
        return this._currency.botId
    }

    public get name(): string {
        return this._currency.name
    }

    public get color(): ColorResolvable {
        return this._currency.color
    }

    public get image(): string {
        return this._currency.image
    }

    public get channel(): string | undefined {
        return this._currency.channel
    }

    public get url(): string | null {
        return this._currency.url
    }

    public get isEmbed(): boolean {
        return this._currency.isEmbed
    }

    /**
     * Retrieves the currency value from coingecko
     *
     * @param {ChannelManager} channel a list of all channels the bot has access
     * @param {CommandInteraction | any} interaction interaction event from user
     */
    public retrieveFromCoinGecko(channel: Channel | null, interaction: CommandInteraction | null): void {
        this.simplePrice({
            ids: this.id,
            vs_currencies: 'usd,php'
        }).then(result => {

            let data: any = result[this.id]
            data["usd_name"] = `USD/${this.name}`
            data["usd_rate"] = data.usd
            data["php_name"] = `PHP/${this.name}`
            data["php_rate"] = data.php

            if (interaction instanceof CommandInteraction)
                this.status(interaction.client.user, data)

            if (!this.isEmbed)
                return

            if (channel == null) {
                CLogger.info("Channel not found")
                return
            }

            if (!(channel instanceof TextChannel)) {
                CLogger.info("Channel is not a Text Channel.")
                return
            }

            this.buildEmbed(data)
            this._embed.sendMessage()
        }).catch(error => {
            console.log(error)
            CLogger.error(`Unable to retrieve ${this.name}, site is probably down.`)
        })
    }

    /**
     * Retrieves the currency value from post
     *
     * @param {ChannelManager} channel a list of all channels the bot has access
     * @param {CommandInteraction | any} interaction interaction event from user
     */
    public retrieveFromPost(channel: Channel | null, interaction: CommandInteraction | null): void {
        if (this.url == null) {
            CLogger.info("Channel is not a Text Channel.")
            return
        }

        axios
            .post(this.url, {
                todo: `Retrieve ${this.name}`
            }).then((response: AxiosResponse) => {
                if (response.status != 200) {
                    CLogger.error(`Retrieve ${this.name} site is currently down.`)
                    return
                }

                if (!this.isEmbed)
                    return

                if (channel == null) {
                    CLogger.error("Channel not found")
                    return
                }

                if (!(channel instanceof TextChannel)) {
                    CLogger.error("Channel is not a Text Channel.")
                    return
                }

                let data: any = response["data"]["Data"]
                data["usd_name"] = `USD/${this.name}`
                data["usd_rate"] = data[`USD${this.id}Rate`]
                data["php_name"] = `WEMIX/${this.name}`
                data["php_rate"] = data[`${this.id}Price`]

                this.buildEmbed(data)
                this._embed.sendMessage()
            }).catch(error => {
                CLogger.error(`Unable to retrieve ${this.name}, site is probably down.`)
            })
    }

    /**
     * Build embed from retreived data.
     *
     * @param {any} response a data response from crypto api
     * @return {EmbedBuilder} a discord embed builder
     */
    public buildEmbed(response: any): void {
        this._embed.files = [new AttachmentBuilder(`${process.cwd()}/src/modules/market/crypto/resources/images/${this.image}`, { name: 'profile-image.png' })]
        this._embed
            .setTitle(`${this.name} PRICE`)
            .setColor(this.color)
            .addFields({
                name: `${response.usd_name}`,
                value: `$${parseFloat(response.usd_rate).toFixed(4)}`,
                inline: true
            }, {
                name: `${response.php_name}`,
                value: `₱${parseFloat(response.php_rate).toFixed(4)}`,
                inline: true
            })
            .setImage('attachment://profile-image.png')
            .setFooter({ text: `${new Date().toUTCString()}` })
    }

    /**
     * Retrieves the currency value from coingecko
     *
     * @param {ClientUser | null} bot discord bot instance
     * @param {any} response a data response from crypto api
     */
    public status(bot: ClientUser | null, response: any): void {
        if (bot == null) {
            CLogger.error("Bot not found")
            return
        }

        let activity: ActivityOptions = {
            name: `${this._currency.name} ~ ₱${response.php.toFixed(2)} 💸`,
            type: ActivityType.Playing
        }

        if (bot.id == this._currency.botId)
            bot.setActivity(activity)
    }
}
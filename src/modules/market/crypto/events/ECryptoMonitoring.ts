import type { ArgsOf } from "discordx";
import { Discord, On, Client } from "discordx";
import { ChannelManager } from "discord.js";
import { ICrypto } from "../interfaces/ICrypto";
import CRetrieveCrypto from "../controllers/CRetrieveCrypto.js";

/**
 * A event representing the crypto process
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
@Discord()
export abstract class ECryptoMonitoring {

    private readonly _currencies: ICrypto[] = [{
        id: "wemix-token",
        botId: "913757627769552918",
        name: "WEMIX",
        color: "#0000FF",
        image: "wemix.png",
        channel: "934136175000698953",
        url: null,
        isEmbed: true
    }, {
        id: "smooth-love-potion",
        botId: "916599306570592297",
        name: "SLP",
        color: "#0000FF",
        image: "slp.png",
        channel: "934136175000698953",
        url: null,
        isEmbed: true
    }, {
        id: "axie-infinity",
        botId: "957696584060113021",
        name: "AXS",
        color: "#0000FF",
        image: "axs.png",
        channel: "934136175000698953",
        url: null,
        isEmbed: true
    }];
    
    /**
     * An event that triggers on bot ready retrieving the currency
     *
     * @param {ArgsOf} member
     * @param {Client} client
     */
    @On({ event: "ready" })
    onReady([member]: ArgsOf<"ready">, client: Client) {
        let retrieveList = this.retrieveList(client.channels)
        setInterval(function () {
            retrieveList
        }, 1800000);
    }

    /**
     * A function that retrieves the currencies
     *
     * @param {ChannelManager} channels
     */
    retrieveList(channels: ChannelManager): void {
        this._currencies.forEach((currency: ICrypto) => {
            
            channels.fetch(`${currency.channel}`).then(async (channel) => {
               
                new CRetrieveCrypto(currency, {
                    interaction: channel
                }).retrieveFromCoinGecko(channel, null)

            })
            
        })
    }
}
import { AttachmentBuilder } from "discord.js";
import { IMMRHistory, IMMRMatch, IStats, IValorant } from "../interfaces/IValorant";
import MValorant from "../models/MValorant.js";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";
import CCanvasBuilder from "../../../main/utilities/canvasbuilder/controllers/CCanvasBuilder.js";

/**
 * A class representing the valorant MMR retrieve controller
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CRetrieveMMR extends MValorant {

    private readonly _embed: CEmbedBuilder

    private readonly _rankUrl: string = "https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/"

    constructor(valorant: IValorant, embed: CEmbedBuilder) {
        super(valorant)
        this._embed = embed
    }

    public get embed(): CEmbedBuilder {
        return this._embed
    }

    /**
     * Retrieves valorant account
     * 
     * @return {Promise<this>} returns the valorant utility
     */
    async execute(): Promise<this> {
        await this.getMMRHistory({
            region: this.region,
            name: this.name,
            tag: this.tag
        }).then(async (response: any) => {
            if (response.error) {
                this.embed.setDescription(`${this.errorHandling(response)}`)
                return
            }

            let mmr: IMMRHistory = response as IMMRHistory
            let stats: IStats = this.fetch(mmr.data)

            this.embed
                .setTitle(`Current Season MMR History`)
                .setThumbnail(`${this._rankUrl}${stats.currenttier}.png`)
                .setDescription(`${this.name}'s mmr history base from the last 7 games, last game was ${mmr.data[0].date}.`)
                .addFields({
                    name: "Name",
                    value: "```" + this.name + "```",
                    inline: true
                }, {
                    name: "Tag",
                    value: "```#" + this.tag + "```",
                    inline: true
                }, {
                    name: "Tier",
                    value: "```" + stats.currenttier_patched + "```",
                    inline: true
                })

            let nextMMR = 1
            mmr.data.slice(0, 7).forEach(history => {
                let rank = mmr.data[nextMMR]
                let icon: string = rank.currenttier != history.currenttier ? "<:RankUp:1006518698921693265>" : "<:RankGain:1006518694047907840>"

                if (history.mmr_change_to_last_game < 0) {
                    icon = rank.currenttier != history.currenttier ? "<:RankDown:1006518691728461825>" : "<:RankLoss:1006518696459636736>"
                }

                this._embed.addFields({
                    name: "Rank",
                    value: "```" + history.currenttierpatched + "```",
                    inline: true
                }, {
                    name: "Points Earned",
                    value: "```" + history.mmr_change_to_last_game + "```",
                    inline: true
                }, {
                    name: `Total Points ${icon}`,
                    value: "```" + history.ranking_in_tier + "```",
                    inline: true
                })

                nextMMR++
            })

            this.embed.canvas = new CCanvasBuilder({
                height: 745,
                width: 100,
                fonts: ["Heavitas"]
            })

            this.embed.canvas.createProgressBar({
                lineCap: "round",
                lineWidth: 600,
                cornerRadius: 37,
                strokeStyle: '#202225',
                x: 5,
                y: 30
            })

            this.embed.canvas.createProgressBar({
                lineCap: "round",
                lineWidth: mmr.data[0].ranking_in_tier * 6,
                cornerRadius: 37,
                strokeStyle: '#3DBAF3',
                x: 5,
                y: 30
            })

            this.embed.canvas.createText({
                text: `${mmr.data[0].ranking_in_tier}/100\t\t`,
                font: '35px "Heavitas"',
                fillStyle: '#ffffff',
                shadowColor: 'Black',
                shadowOffsetX: 4,
                shadowOffsetY: 4,
                shadowBlur: 10,
                x: 0,
                y: this.embed.canvas.canvas.height / 2.4,
                measureCenter: true
            })

            this.embed.file = new AttachmentBuilder(this.embed.canvas.canvas.toBuffer(), { name: 'profile-image.png' })

            this.embed
                .setImage('attachment://profile-image.png')
        }).catch(error => {
            console.log(error)
            this.embed.setDescription("[retrieveMMR] Something is wrong, please check the error log.")
        })

        return this
    }

    /**
     * Retrieves highest rank from MMR History
     *
     * @param {IMMRMatch[]} mmr an array of all mmr history
     * @return {IStats} overall player stats
     */
    fetch(mmr: IMMRMatch[]): IStats {
        let stats: IStats = {
            score: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            bodyshots: 0,
            headshots: 0,
            legshots: 0,
            mostkills: 0,
            mostdeaths: 0,
            mostassists: 0,
            currenttier: 0,
            currenttier_patched: "Unranked"
        }

        mmr.every(match => {
            if (stats.currenttier < match.currenttier) {
                stats.currenttier = this.name.toLowerCase() == "fruitjesus" ? 3 : match.currenttier
                stats.currenttier_patched = this.name.toLowerCase() == "fruitjesus" ? "Certified Thrower" : match.currenttierpatched
            }
        })

        return stats
    }

}
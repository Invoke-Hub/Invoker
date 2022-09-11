import { IMatch, IMatches, IStats, IValorant } from "../interfaces/IValorant";
import { APIResponse } from "unofficial-valorant-api";
import MValorant from "../models/MValorant.js";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";

/**
 * A class representing the valorant match retrieve controller
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CRetrieveMatch extends MValorant {

    private readonly _embed: CEmbedBuilder

    constructor(valorant: IValorant, embed: CEmbedBuilder) {
        super(valorant)
        this._embed = embed
    }

    public get embed(): CEmbedBuilder {
        return this._embed
    }

    /**
     * Totals the stats of player in all games
     *
     * @param {any} mode selected game mode to retrieve
     * @return {Promise<this>} returns the valorant utility
     */
    async execute(mode: any): Promise<this> {
        await this.getMatches({
            region: this.region,
            name: this.name,
            tag: this.tag,
            filter: mode,
            size: 10
        }).then((response: APIResponse) => {
            if (response.error) {
                this._embed.setDescription(`${this.errorHandling(response)}`)
                return
            }

            let matches: IMatches = response as IMatches
            if (matches.data.length == 0) {
                this._embed.setDescription(`There are no matches found for the game mode: ${mode}.`)
                return
            }

            let stats: IStats = this.fetch(matches.data)

            this._embed
                .setTitle(`Current Season Profile: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`)
                .setThumbnail(`${process.env.SETUP_MESSAGE_GAMES_VALORANT_RANK_URL}${stats.currenttier}.png`)
                .setDescription(`${this.name}'s statistics base from the last 10 games, last game was ${matches.data[0].metadata.game_start_patched}.`)
                .addFields({
                    name: "Name",
                    value: "```" + this.name + "```",
                    inline: true
                }, {
                    name: "Tag",
                    value: "```#" + this.tag + "```",
                    inline: true
                }, {
                    name: "Peak Tier",
                    value: "```" + stats.currenttier_patched + "```",
                    inline: true
                }, {
                    name: "Kills",
                    value: "```" + stats.kills.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Deaths",
                    value: "```" + stats.deaths.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Assists",
                    value: "```" + stats.assists.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Head Shots",
                    value: "```" + stats.headshots.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Body Shots",
                    value: "```" + stats.bodyshots.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Leg Shots",
                    value: "```" + stats.legshots.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Most Kills",
                    value: "```" + stats.mostkills.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Most Deaths",
                    value: "```" + stats.mostdeaths.toLocaleString() + "```",
                    inline: true
                }, {
                    name: "Most Assists",
                    value: "```" + stats.mostassists.toLocaleString() + "```",
                    inline: true
                })

        }).catch(error => {
            console.log(error)
            this._embed.setDescription("[retrieveMatches] Something is wrong, please check the error log.")
        })

        return this
    }

    /**
     * Totals the stats of player in all games
     *
     * @param {IMatch[]} matches an array of all matches
     * @return {IStats} overall player stats
     */
    fetch(matches: IMatch[]): IStats {
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

        matches.filter(match => match.players.all_players.filter(player => player.name.toLowerCase() == this.name.toLowerCase() && player.tag.toLowerCase() == this.tag.toLowerCase()).every(player => {
            Object.entries(player.stats).forEach(entry => {
                let [key, value] = entry
                let attribute: keyof IStats = key as keyof IStats

                switch (attribute) {
                    case "currenttier_patched":
                        break
                    default:
                        if (attribute == "kills" || attribute == "deaths" || attribute == "assists") {
                            stats[`most${attribute}`] = stats[`most${attribute}`] > value ? stats[`most${attribute}`] : value
                        }

                        stats[attribute] += value
                        break
                }
            })

            if (stats.currenttier < player.currenttier) {
                stats.currenttier = this.name.toLowerCase() == "fruitjesus" ? 3 : player.currenttier
                stats.currenttier_patched = this.name.toLowerCase() == "fruitjesus" ? "Certified Thrower" : player.currenttier_patched
            }
        }))

        return stats
    }

}
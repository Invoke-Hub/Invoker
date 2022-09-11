import { IMatch, IMatches, IPlayer, ISessionPlaytime, IStats, ITeam, ITeams, IValorant } from "../interfaces/IValorant";
import { APIResponse } from "unofficial-valorant-api";
import MValorant from "../models/MValorant.js";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";

/**
 * A class representing the valorant agent retrieve controller
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CRetrieveAgent extends MValorant {

    private readonly _embed: CEmbedBuilder

    constructor(valorant: IValorant, embed: CEmbedBuilder) {
        super(valorant)
        this._embed = embed
    }

    public get embed(): CEmbedBuilder {
        return this._embed
    }

    /**
     * Totals the agent stats of player in all games
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
            size: 30
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

            let player: IPlayer[] = this.fetch(matches.data)

            this._embed
                .setTitle(`Agent Profile`)
                .setThumbnail(`${player[0].assets.agent.small}`)
                .setDescription(`${this.name}'s agent profile base from the last 10 games, last game was ${matches.data[0].metadata.game_start_patched}.`)
                .addFields({
                    name: "Name",
                    value: "```" + this.name + "```",
                    inline: true
                }, {
                    name: "Tag",
                    value: "```#" + this.tag + "```",
                    inline: true
                }, {
                    name: "Top Agent",
                    value: "```" + player[0].character + "```",
                    inline: true
                })

            player.slice(0, 7).forEach(agent => {
                let winrate: number = ((agent.player_info!.team.rounds_lost - agent.player_info!.team.rounds_won) / agent.player_info!.team.rounds_won)
                let time: number = Math.round((agent.session_playtime.minutes / 60))
                let display: string = time ? `${time}h` : `${agent.session_playtime.minutes}m`

                this._embed.addFields({
                    name: "Agent",
                    value: "```" + agent.character + "```",
                    inline: true
                }, {
                    name: "Time Played",
                    value: "```" + display + " : (" + agent.player_info!.matches + ") Matches```",
                    inline: true
                }, {
                    name: `Win Rate`,
                    value: "```" + winrate.toFixed(1) + "```",
                    inline: true
                })
            })


        }).catch(error => {
            console.log(error)
            this._embed.setDescription("[retrieveAgents] Something is wrong, please check the error log.")
        })

        return this
    }

    /**
     * Totals the agent stats of player in all games
     *
     * @param {IMatch[]} matches an array of all matches
     * @return {IStats} overall player stats
     */
    fetch(matches: IMatch[]): IPlayer[] {
        let agents: IPlayer[] = new Array()

        matches.filter(match => match.players.all_players.filter(player => player.name.toLowerCase() == this.name.toLowerCase() && player.tag.toLowerCase() == this.tag.toLowerCase()).every(player => {

            if (agents.filter(agent => agent.character === player.character).length <= 0) {
                player.player_info = {
                    team: {
                        has_won: false,
                        rounds_won: 0,
                        rounds_lost: 0
                    },
                    matches: 0
                }
                agents.push(player)
            }

            agents.filter(agent => agent.character === player.character).forEach(agent => {
                Object.entries(player.stats).forEach(entry => {
                    let [key, value] = entry
                    let attribute: keyof IStats = key as keyof IStats

                    if (attribute != "currenttier_patched")
                        agent.stats[attribute] += value
                })

                Object.entries(player.session_playtime).forEach(entry => {
                    let [key, value] = entry
                    let attribute: keyof ISessionPlaytime = key as keyof ISessionPlaytime
                    agent.session_playtime[attribute] += value
                })

                if (agent.player_info != undefined) {
                    let team: ITeam = match.teams[`${agent.team.toLowerCase() as keyof ITeams}`]

                    Object.entries(team).forEach(entry => {
                        let [key, value] = entry
                        let attribute: keyof ITeam = key as keyof ITeam

                        if (attribute != "has_won")
                            agent.player_info!.team[attribute] += value
                    })

                    agent.player_info.matches += 1
                }

                agent.damage_made += player.damage_made
                agent.damage_received += player.damage_received
            })

        }))

        agents.sort((a, b) => (a.player_info!.matches < b.player_info!.matches) ? 1 : ((b.player_info!.matches < a.player_info!.matches) ? -1 : 0))

        return agents
    }

}
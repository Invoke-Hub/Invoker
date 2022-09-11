import { IValorant } from "../interfaces/IValorant";
import ValorantAPI, { APIResponse } from "unofficial-valorant-api";
import CLogger from "../../../main/utilities/logbuilder/controllers/CLogBuilder.js";

/**
 * A class representing the valorant model
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class MValorant extends ValorantAPI {

    private readonly _valorant: IValorant

    constructor(valorant: IValorant) {
        super()
        this._valorant = valorant
    }

    public get name(): string {
        return this._valorant.name
    }

    public get tag(): string {
        return this._valorant.tag
    }

    public get region(): any {
        return this._valorant.region
    }

    /**
    * Error handling from API
    *
    * @param {APIResponse} response the response of the api
    * @return {string} response status translation
    */
    errorHandling(response: APIResponse): string {
        CLogger.error(response)
        switch (response.status) {
            case 1: return "Invalid API Key"
            case 2: return "Forbidden endpoint"
            case 3: return "Restricted endpoint"
            case 101: return "No region found for this Player"
            case 102: return "No matches found, can't get puuid"
            case 103: return "Possible name change detected, can't get puuid. Please play one match, wait 1-2 minutes and try it again"
            case 104: return "Invalid region"
            case 105: return "Invalid filter"
            case 106: return "Invalid gamemode"
            case 107: return "Invalid map"
            case 108: return "Incalid locale"
            case 109: return "Missing name"
            case 110: return "Missing tag"
            case 111: return "Player not found in leaderboard"
            case 112: return "Invalid raw type"
            case 113: return "Invalid match or player id"
            case 114: return "Invalid country code"
            case 115: return "Invalid season"
            default: return Array.isArray(response.error) ? response.error[0].message : "Riot Origin Server down for maintenance, Please try again."
        }
    }

}
import MCrypto from "../models/MCrypto.js";
import { ICrypto } from "../interfaces/ICrypto";
import { IBuilder } from "../../../main/utilities/embedbuilder/interfaces/IBuilder";
import CEmbedBuilder from "../../../main/utilities/embedbuilder/controllers/CEmbedBuilder.js";

/**
 * A class representing the crypto retriever controller
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CRetrieveCrypto extends MCrypto {

    constructor(crypto: ICrypto, builder: IBuilder) {
        super(crypto, new CEmbedBuilder(builder))
    }

}
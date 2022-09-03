import { CommandInteraction, EmbedBuilder, AttachmentBuilder } from "discord.js";
import CCanvasBuilder from "../../canvasbuilder/controllers/CCanvasBuilder.js";
import { IBuilder } from "../interfaces/IBuilder";

/**
 * A class that builds embeds for controllers
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CEmbedBuilder extends EmbedBuilder {

    private readonly _builder: IBuilder

    private _canvas = new CCanvasBuilder({
        height: 1,
        width: 1,
        fonts: ["Heavitas"]
    })

    private _file: AttachmentBuilder = new AttachmentBuilder(this._canvas.canvas.toBuffer(), { name: 'profile-image.png' })

    constructor(builder: IBuilder) {
        super()
        this._builder = builder
    }

    public get interaction(): CommandInteraction {
        return this._builder.interaction
    }

    public get canvas(): CCanvasBuilder {
        return this._canvas
    }

    public set canvas(canvas: CCanvasBuilder) {
        this._canvas = canvas
    }

    public get file(): AttachmentBuilder {
        return this._file
    }

    public set file(file: AttachmentBuilder) {
        this._file = file
    }

    /**
     * Sends the chat message
     */
    sendMessage(): void {
        this.interaction.followUp({
            embeds: [
                this,
            ]
        })
    }

    /**
     * Sends the chat message with file
     */
    sendMessageWithFile(): void {
        this.interaction.followUp({
            embeds: [
                this,
            ],
            files: [
                this._file
            ]
        })
    }

}
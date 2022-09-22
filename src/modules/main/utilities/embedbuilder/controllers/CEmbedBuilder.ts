import { CommandInteraction, EmbedBuilder, AttachmentBuilder, Channel, TextChannel, ActionRowData, APIActionRowComponent, APIMessageActionRowComponent, JSONEncodable, MessageActionRowComponentBuilder, MessageActionRowComponentData, APIAttachment, Attachment, AttachmentPayload, BufferResolvable, CacheType, SelectMenuInteraction } from "discord.js";
import { Stream } from "stream";
import { IBuilder } from "../interfaces/IBuilder";
import CCanvasBuilder from "../../canvasbuilder/controllers/CCanvasBuilder.js";

/**
 * A class that builds embeds for controllers
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CEmbedBuilder extends EmbedBuilder {

    private readonly _builder: IBuilder

    private _description: string = ""

    private _canvas = new CCanvasBuilder({
        height: 1,
        width: 1,
        fonts: ["Heavitas"]
    })

    private _files: (AttachmentBuilder | BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentPayload)[] | undefined

    private _components: (JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>| ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIActionRowComponent<APIMessageActionRowComponent>)[] | undefined

    constructor(builder: IBuilder) {
        super()
        this._builder = builder
    }

    public get builder(): IBuilder {
        return this._builder
    }

    public get interaction(): CommandInteraction | SelectMenuInteraction<CacheType> | Channel | null {
        return this._builder.interaction
    }

    public get canvas(): CCanvasBuilder {
        return this._canvas
    }

    public set canvas(canvas: CCanvasBuilder) {
        this._canvas = canvas
    }

    public get files(): (AttachmentBuilder | BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentPayload)[] | undefined {
        return this._files
    }

    public set files(files: (AttachmentBuilder | BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentPayload)[] | undefined) {
        this._files = files
    }

    public get components() : (JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>| ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIActionRowComponent<APIMessageActionRowComponent>)[] | undefined {
        return this._components
    }

    public set components(components: (JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>| ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIActionRowComponent<APIMessageActionRowComponent>)[] | undefined) {
        this._components = components
    }

    public get description(): string {
        return this._description
    }

    public set description(description: string) {
        this._description = description.replaceAll(`"""`,"```")
    }

    /**
     * Sends the chat message
     */
    sendMessage(): void {
        if (this.interaction instanceof CommandInteraction)
            this.interaction.followUp({
                embeds: [this],
                files: this._files,
                components: this._components
            })
        else
            (this.interaction as TextChannel).send({ 
                embeds: [this],
                files: this._files,
                components: this._components
            })
    }

    editMessage(): void {
        if (this.interaction instanceof SelectMenuInteraction)
            this.interaction.editReply({
                embeds: [this],
                files: this._files,
                components: this._components
            })
    }

}
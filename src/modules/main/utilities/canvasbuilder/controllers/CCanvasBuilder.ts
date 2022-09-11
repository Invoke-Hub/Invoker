import { IArc, ICanvas, IFont, IImage, IProgressBar } from "../interfaces/ICanvas";
import canvas, { Canvas as CanvasB } from "canvas";
const { Canvas, loadImage, registerFont } = canvas;

/**
 * A class representing the canvas controller
 *
 * @author  Devitrax
 * @version 1.0, 04/08/22
 */
export default class CCanvasBuilder {

    private readonly _canvas: CanvasB

    constructor(canvas: ICanvas) {
        canvas.fonts.forEach(font => {
            registerFont(`${process.cwd()}/src/modules/main/utilities/canvasbuilder/resources/fonts/${font}.ttf`, { family: font })
        })

        this._canvas = new Canvas(canvas.height, canvas.width)
    }

    public get canvas(): CanvasB {
        return this._canvas
    }

    public get context(): canvas.CanvasRenderingContext2D {
        return this._canvas.getContext('2d')
    }

    /**
     * Creates image in canvas
     *
     * @param {IImage} image
     */
    async createImage(image: IImage): Promise<void> {
        this.context.drawImage(await loadImage(image.src), image.dx, image.dy, image.dw, image.dh)
    }

    /**
     * Creates image in canvas
     *
     * @param {IArc} arc
     */
    async createArcFromImage(arc: IArc): Promise<void> {
        Object.entries(arc).forEach(entry => {
            let [key, value] = entry
            let context: any = this.context

            if (value)
                context[key] = value
        })

        this.context.beginPath()
        this.context.arc(arc.image.dx + 100, 125, 100, 0, Math.PI * 2, true)
        this.context.closePath()
        this.context.clip()
        await this.createImage(arc.image)
        this.context.stroke()
    }

    /**
     * Creates progress bar in canvas
     *
     * @param {IProgressBar} progressBar
     */
    createProgressBar(progressBar: IProgressBar): void {
        Object.entries(progressBar).forEach(entry => {
            let [key, value] = entry
            let context: any = this.context

            if (value)
                context[key] = value
        })

        let innerLength = progressBar.lineWidth - progressBar.cornerRadius * 2
        if (innerLength < 0) innerLength = 0

        let actualCornerRadius = progressBar.cornerRadius
        if (progressBar.lineWidth < progressBar.cornerRadius * 2) {
            actualCornerRadius = progressBar.lineWidth / 2
        }

        this.context.lineWidth = actualCornerRadius

        const leftX = progressBar.x + actualCornerRadius / 2
        const rightX = leftX + innerLength

        this.context.beginPath()
        this.context.moveTo(leftX, progressBar.y)
        this.context.lineTo(rightX, progressBar.y)
        this.context.stroke()
    }

    /**
     * Creates text in canvas
     *
     * @param {IFont} font
     */
    createText(font: IFont): void {
        Object.entries(font).forEach(entry => {
            let [key, value] = entry
            let context: any = this.context

            if (value)
                context[key] = value
        })

        if (font.measureCenter)
            font.x = (this.canvas.width / 2) - (this.context.measureText(font.text).width / 2)

        this.context.fillText(font.text, font.x, font.y)
    }

    /**
     * Resizes the text font size until it fits
     *
     * @param {string} text
     */
    resizeText(text: string) {
        let fontSize = 50

        do {
            this.context.font = `${fontSize -= 5}px "Heavitas"`
        } while (this.context.measureText(text).width > this.canvas.width - 100)

        return this.context.font
    }
}
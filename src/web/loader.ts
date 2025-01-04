import { resizeElementToMax } from "./dynamic-resizer";

export class Loader {
  private readonly RADIUS = 60;
  private readonly NUMBER_FRAMES = 180;
  private currentFrame: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private intervalID: null | number = null;
  /**
   * Constructor of the loader.
   * @param text Text to write under the loader.
   * @param canvasId 
   */
  public constructor(private text: string, canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.currentFrame = 0;
  }

  /**
   * Draws the loader on the canvas.
   */
  public startAnimation(): void {
    resizeElementToMax(this.canvas);
    this.intervalID = setInterval(this.drawFrame, 1);
  }

  public stopAnimation(): void {
    if (this.intervalID === null) {
      throw new Error("Loader: there is no animation to stop.");
    }
    clearInterval(this.intervalID);
  }

  /**
   * Sets the text under the loader.
   * @param text
   */
  public setText(text: string): void {
    this.text = this.text;
  }

  private drawFrame = (): void => {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.context.clearRect(0, 0, width, height);
    const MIDDLE_X = Math.round(width / 2);
    const MIDDLE_Y = Math.round(height / 2);
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = "lightgrey";
    this.context.arc(MIDDLE_X, MIDDLE_Y, this.RADIUS, 0, 2 * Math.PI);
    this.context.stroke()
    this.context.beginPath();
    this.context.strokeStyle = "#5F9EA0"; // Green color for the segment
    const SIZE_SEGMENT = Math.PI / 2;
    const STARTING_POSITION = this.currentFrame * (2 * Math.PI / this.NUMBER_FRAMES);
    this.context.arc(MIDDLE_X, MIDDLE_Y, this.RADIUS, STARTING_POSITION, STARTING_POSITION + SIZE_SEGMENT);
    this.context.stroke();
    const TEXT_SPACE_WITH_LOADER = 17;
    this.context.font = "14px Franklin Gothic Medium"
    this.context.fillText(this.text, MIDDLE_X - this.RADIUS + TEXT_SPACE_WITH_LOADER, MIDDLE_Y + this.RADIUS + TEXT_SPACE_WITH_LOADER);

    ++this.currentFrame;
    if (this.currentFrame > this.NUMBER_FRAMES) {
      this.currentFrame = 0;
    }
  }

}
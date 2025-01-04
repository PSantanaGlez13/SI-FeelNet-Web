export function resizeElementToMax(element: HTMLElement): void {
  const ELEMENT_AS_CANVAS: HTMLCanvasElement = element as HTMLCanvasElement; 
  ELEMENT_AS_CANVAS.width = ELEMENT_AS_CANVAS.parentElement!.clientWidth!;
  ELEMENT_AS_CANVAS.height = ELEMENT_AS_CANVAS.parentElement!.clientHeight!;
}
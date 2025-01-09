import Chart from "chart.js/auto";
import { showEmptyWordMessage } from "./error-messages";
import { Loader } from "./loader";
import { resizeElementToMax } from "./dynamic-resizer";
import { getChart, formatData } from "./chart_supp";

// The chart used on the web.
let resultChart: Chart | undefined;

// Callback function for the button onClick event
function evaluateWord(canvas: HTMLCanvasElement): void {
  const WORD_TO_EVAL: HTMLInputElement = document.getElementById("word")! as HTMLInputElement;
  const WORD_CONTENT: string = WORD_TO_EVAL.value;
  if (WORD_CONTENT.match(/^\s*$/)) {
    showEmptyWordMessage();
    return;
  }
  const MODEL_TO_EVAL: HTMLInputElement = document.getElementById("models")! as HTMLInputElement;
  const MODEL_TEXT: string = MODEL_TO_EVAL.value;
  const QUERY_URL: string = `model=${MODEL_TEXT}&&word=${WORD_CONTENT}`;
  console.log("Trying to fulfill the request: ", QUERY_URL);
  // Delete the current chart object
  resultChart!.destroy();
  const LOADER = new Loader("", "result-chart");
  LOADER.startAnimation();
  fetch(QUERY_URL)
    .then(async (response) => {
      const JSON = await response.json();
      LOADER.stopAnimation();
      const LABELS = JSON.labels;
      const COUNTS = JSON.counts;
      resultChart = getChart(canvas, formatData(LABELS, COUNTS));
      console.log("Request fulfilled!", JSON);
    })
    .catch(() => {
      LOADER.stopAnimation();
      resultChart = getChart(canvas);
      console.log("Could not fulfill the request!");
    })
}

function main(): void {
  const BUTTON: HTMLButtonElement = document.getElementById("evaluate")! as HTMLButtonElement;
  const CANVAS: HTMLCanvasElement = document.getElementById("result-chart")! as HTMLCanvasElement;
  resultChart = getChart(CANVAS);
  resizeElementToMax(CANVAS);
  window.addEventListener("resize", () => resizeElementToMax(CANVAS));
  BUTTON.addEventListener("click", () => evaluateWord(CANVAS));
}

main();
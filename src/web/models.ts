import Chart from "chart.js/auto";
import { showEmptyWordMessage } from "./error-messages";
import { Loader } from "./loader";
import { resizeElementToMax } from "./dynamic-resizer";

interface DatasetInfo {
  label: string;
  data: number[]
}

interface DataChart {
  labels: string[];
  datasets: Array<DatasetInfo>;
}

function formatData(labels: string[], data: number[]): DataChart {
  return {
    labels,
    datasets: [{
      label: "Result of the query",
      data
    }]
  }
}

function getChart(canvas: HTMLCanvasElement, data: DataChart | null = null): Chart<"bar"> {
  const DEFAULT_DATA: DataChart = {
    labels: ["Sadness", "Joy", "Love", "Anger", "Fear", "Surprise"],
    datasets: [{
      label: "Result of the query",
      data: [0, 0, 0, 0, 0, 0]
    }]
  }
  if (data === null) data = DEFAULT_DATA;
  return new Chart(canvas, {
    type: "bar",
    data
  });
}

function evaluateWord(resultChart: Chart, canvas: HTMLCanvasElement): void {
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
  resultChart.destroy();
  const LOADER = new Loader("Scraping and evaluating with the model", "result-chart");
  LOADER.startAnimation();
  fetch(QUERY_URL)
    .then(async (response) => {
      // Do smth with the result.
      const JSON = await response.json();
      LOADER.stopAnimation();
      const LABELS = JSON.labels;
      const COUNTS = JSON.counts;
      resultChart = getChart(canvas, formatData(LABELS, COUNTS));
      console.log("Request fulfilled!", JSON);
    })
    .catch(() => {
      // Do smth with the error.
      LOADER.stopAnimation();
      resultChart = getChart(canvas);
      resultChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
      console.log("Could not fulfill the request!");
    })
}


function main(): void {
  const BUTTON: HTMLButtonElement = document.getElementById("evaluate")! as HTMLButtonElement;
  const CANVAS: HTMLCanvasElement = document.getElementById("result-chart")! as HTMLCanvasElement;
  let resultChart: Chart = getChart(CANVAS);
  resizeElementToMax(CANVAS);
  window.addEventListener("resize", () => resizeElementToMax(CANVAS));
  BUTTON.addEventListener("click", () => evaluateWord(resultChart, CANVAS));
  // Get button
  // Add onClick event -> Function for the event callback
  // Construct query with the values of the "word" and "models"
  // If "word" is empty, show error message -> Function.
  // Send query.
  // Write result on screen  -> Function
}

main();
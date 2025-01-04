import Chart from "chart.js/auto";
import { showEmptyWordMessage } from "./error-messages";
import { Loader } from "./loader";
import { resizeElementToMax } from "./dynamic-resizer";

function evaluateWord(resultChart: Chart): void {
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
  fetch(QUERY_URL)
    .then(async (response) => {
      // Do smth with the result.
      resultChart.destroy();
      const LOADER = new Loader("Im doing stuff", "result-chart");
      LOADER.startAnimation();
      const TEXT = await response.text();
      console.log("Request fulfilled!", TEXT);
    })
    .catch(() => {
      // Do smth with the error.
      console.log("Could not fulfill the request!");
    })
}


function main(): void {
  const BUTTON: HTMLButtonElement = document.getElementById("evaluate")! as HTMLButtonElement;
  const CANVAS: HTMLCanvasElement = document.getElementById("result-chart")! as HTMLCanvasElement;
  let resultChart: Chart = new Chart(CANVAS, {
    type: "bar",
    data: {
      labels: ["Sadness", "Joy", "Love", "Anger", "Fear", "Surprise"],
      datasets: [{
        label: "Result of the query",
        data: [5, 3, 2, 4, 0, 1]
      }]
    }
  });
  resizeElementToMax(CANVAS);
  window.addEventListener("resize", () => resizeElementToMax(CANVAS));
  BUTTON.addEventListener("click", () => evaluateWord(resultChart));
  // Get button
  // Add onClick event -> Function for the event callback
  // Construct query with the values of the "word" and "models"
  // If "word" is empty, show error message -> Function.
  // Send query.
  // Write result on screen  -> Function
}

main();
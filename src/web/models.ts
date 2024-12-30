import Chart from "chart.js/auto";

function evaluateWord(resultChart: Chart): void {
  const WORD_TO_EVAL: HTMLInputElement = document.getElementById("word")! as HTMLInputElement;
  const WORD_CONTENT: string = WORD_TO_EVAL.value;
  if (WORD_CONTENT.match(/^\s*$/)) {
    // CALL ERROR FUNCTION!
    return;
  }
  const MODEL_TO_EVAL: HTMLInputElement = document.getElementById("models")! as HTMLInputElement;
  const MODEL_TEXT: string = MODEL_TO_EVAL.value;
  const QUERY_URL: string = `model=${MODEL_TEXT}&&word=${WORD_CONTENT}`;
  console.log("Trying to fulfill the request: ", QUERY_URL);
  fetch(QUERY_URL)
    .then(() => {
      // Do smth with the result.
      console.log("Request fulfilled!");
    })
    .catch(() => {
      // Do smth with the error.
      console.log("Could not fulfill the request!");
    })
}


function main(): void {
  const BUTTON: HTMLButtonElement = document.getElementById("evaluate")! as HTMLButtonElement;
  const CANVAS: HTMLCanvasElement = document.getElementById("result-chart")! as HTMLCanvasElement;
  const RESULT_CHART: Chart = new Chart(CANVAS, {
    type: "bar",
    data: {
      labels: ["Sadness", "Joy", "Love", "Anger", "Fear", "Surprise"],
      datasets: [{
        label: "Result of the query",
        data: [5, 3, 2, 4, 0, 1]
      }]
    }
  });
  BUTTON.addEventListener("click", () => evaluateWord(RESULT_CHART));
  // Get button
  // Add onClick event -> Function for the event callback
  // Construct query with the values of the "word" and "models"
  // If "word" is empty, show error message -> Function.
  // Send query.
  // Write result on screen  -> Function
}

main();
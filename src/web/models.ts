
function evaluateWord(): void {
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
  BUTTON.addEventListener("click", () => evaluateWord());
  // Get button
  // Add onClick event -> Function for the event callback
  // Construct query with the values of the "word" and "models"
  // If "word" is empty, show error message -> Function.
  // Send query.
  // Write result on screen  -> Function
}

main();
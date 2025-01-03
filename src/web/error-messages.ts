const CONTENT_ROOT_DIRECTORY: string = "web/";

let isShowingEmpty = false;
export function showEmptyWordMessage() {
  if (isShowingEmpty) return;
  isShowingEmpty = true;
  // Adding red outline.
  const WORD_FIELD: HTMLElement = document.getElementById("word")!;
  WORD_FIELD.classList.add("incorrect");
  // Creating error icon and text elements.
  const ERROR_SPAN: HTMLSpanElement = document.createElement("span");
  ERROR_SPAN.id = "error-icon";
  const ERROR_IMAGE: HTMLImageElement = document.createElement("img");
  ERROR_IMAGE.src = CONTENT_ROOT_DIRECTORY + "error-icon-32.png";
  ERROR_IMAGE.width = WORD_FIELD.clientHeight;
  ERROR_IMAGE.height = WORD_FIELD.clientHeight;
  ERROR_SPAN.appendChild(ERROR_IMAGE);
  const ERROR_TEXT: HTMLParagraphElement = document.createElement("p");
  ERROR_TEXT.textContent = "Can't be empty!";
  ERROR_SPAN.appendChild(ERROR_TEXT);
  // Adding the error elements to the DOM
  const WORD_FIELD_CONTAINER = document.getElementById("word-container") as HTMLElement;
  const LAST_LINE_BREAK_IND = WORD_FIELD_CONTAINER.children.length - 2;
  const LAST_LINE_BREAK = WORD_FIELD_CONTAINER.children[LAST_LINE_BREAK_IND];
  WORD_FIELD_CONTAINER.insertBefore(ERROR_SPAN, LAST_LINE_BREAK);
  WORD_FIELD.addEventListener("click", () => {
    clearEmptyWordErrorMessage(ERROR_SPAN, WORD_FIELD);
    WORD_FIELD.removeEventListener("click", ()=>{});
  });
}

export function clearEmptyWordErrorMessage(errorImg: HTMLElement, wordField: HTMLElement) {
  isShowingEmpty = false;
  errorImg.remove();
  wordField.classList.remove("incorrect");
}
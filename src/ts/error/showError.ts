export function showError(errorMessage: string): void {
  const errorFragment = <DocumentFragment>document.createDocumentFragment();
  const errorWrapEl = <HTMLDivElement>document.createElement("div");
  const errorMessageEl = <HTMLParagraphElement>document.createElement("p");
  errorWrapEl.className = "error-wrap";
  errorMessageEl.className = "error-message";
  errorMessageEl.textContent = errorMessage;
  errorWrapEl.append(errorMessageEl);
  errorFragment.append(errorWrapEl);
  document.body.append(errorFragment);
}

export function clearError(): void {
  const errorWrapEl = <HTMLElement>document.querySelector(".error-wrap");
  errorWrapEl.remove();
}

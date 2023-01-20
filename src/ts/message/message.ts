export function showMessage(message: string): void {
  console.log("show message");
  const messageFragment = <DocumentFragment>document.createDocumentFragment();
  const messageWrapEl = <HTMLDivElement>document.createElement("div");
  const messageMessageEl = <HTMLParagraphElement>document.createElement("p");
  messageWrapEl.className = "message-wrap";
  messageMessageEl.className = "message";
  messageMessageEl.textContent = message;
  messageWrapEl.append(messageMessageEl);
  messageFragment.append(messageWrapEl);
  document.body.append(messageFragment);
  setTimeout(clearMessage, 3000);
}

export function clearMessage(): void {
  const messageWrapEl = <HTMLElement>document.querySelector(".message-wrap");
  messageWrapEl.remove();
  console.log("delete message");
}

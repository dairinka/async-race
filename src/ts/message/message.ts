export function showMessage(message: string, carId = ""): void {
  console.log("show message");
  const messageFragment = <DocumentFragment>document.createDocumentFragment();
  const messageWrapEl = <HTMLDivElement>document.createElement("div");
  const messageMessageEl = <HTMLParagraphElement>document.createElement("p");
  messageWrapEl.className = "message-wrap";
  messageMessageEl.className = "message";
  messageMessageEl.textContent = `${message}`;
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

export function showWinner(carId: string, time: string): void {
  console.log("show winner");
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const carNameEl = <HTMLElement>carBlock.querySelector(".car__name");
  const carName: string = carNameEl.textContent || "****";
  const message = `Winner: <span style="font-weight:bold; font-size:2.5vw">${carName}</span> <br>
                       Time: <span style="font-weight:bold;">${time}</span>`;
  const messageFragment = <DocumentFragment>document.createDocumentFragment();
  const messageWrapEl = <HTMLDivElement>document.createElement("div");
  const messageMessageEl = <HTMLParagraphElement>document.createElement("p");
  messageWrapEl.className = "message-winner-wrap";
  messageMessageEl.className = "message-winner";
  messageMessageEl.innerHTML = `${message}`;
  messageWrapEl.append(messageMessageEl);
  messageFragment.append(messageWrapEl);
  document.body.append(messageFragment);
  //setTimeout(clearMessage, 3000);
}

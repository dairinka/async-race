export function drawMainPage(): void {
  const mainPageFragment = <DocumentFragment>document.createDocumentFragment();
  const allWrapperEl = <HTMLDivElement>document.createElement("div");
  const menuLineEl = <HTMLDivElement>document.createElement("div");
  const controlCarUlEl = <HTMLUListElement>document.createElement("ul");
  const controlRaceLineEl = <HTMLDivElement>document.createElement("div");
  const mainEl = <HTMLElement>document.createElement("main");
  allWrapperEl.className = "all-wrapper";
  menuLineEl.className = "page-btns";
  controlCarUlEl.className = "car-control-block";
  controlRaceLineEl.className = "control-race";
  mainEl.className = "main garage";
  drawMenu(menuLineEl);
  drawControlBlock(controlCarUlEl);
  drawControlRaceLine(controlRaceLineEl);
  drawMainBlock(mainEl);
  allWrapperEl.append(menuLineEl, controlCarUlEl, controlRaceLineEl, mainEl);
  mainPageFragment.append(allWrapperEl);
  document.body.append(mainPageFragment);
}

function drawMenu(parentElement: HTMLElement): void {
  const garagebtn = <HTMLButtonElement>document.createElement("button");
  const winnersbtn = <HTMLButtonElement>document.createElement("button");
  garagebtn.className = winnersbtn.className = "btn";
  garagebtn.dataset.btn = "garage";
  winnersbtn.dataset.btn = "winners";
  garagebtn.textContent = "Garage";
  winnersbtn.textContent = "Winners";
  parentElement.append(garagebtn, winnersbtn);
}

function drawControlBlock(parentElement: HTMLElement): void {
  for (let i = 0; i < 2; i += 1) {
    const li = <HTMLLIElement>document.createElement("li");
    const inputName = <HTMLInputElement>document.createElement("input");
    const inputColor = <HTMLInputElement>document.createElement("input");
    const btn = <HTMLButtonElement>document.createElement("button");
    li.className = "contol-line";
    inputName.className = "name-input input";
    inputColor.className = "color-input input";
    inputName.type = "text";
    inputColor.type = "color";
    btn.className = "btn";
    if (i === 0) {
      btn.textContent = "Create";
      btn.dataset.btn = "create";
    } else {
      btn.textContent = "Update";
      btn.dataset.btn = "update";
    }
    li.append(inputName, inputColor, btn);
    parentElement.appendChild(li);
  }
}

function drawControlRaceLine(parentElement: HTMLElement) {
  const raceBtn = <HTMLButtonElement>document.createElement("button");
  const resetBtn = <HTMLButtonElement>document.createElement("button");
  const generateCarsBtn = <HTMLButtonElement>document.createElement("button");
  raceBtn.className = resetBtn.className = "btn";
  generateCarsBtn.className = "btn generate-btn";
  raceBtn.dataset.btn = resetBtn.dataset.btn = "race";
  generateCarsBtn.dataset.btn = "generate";
  raceBtn.textContent = "Race";
  resetBtn.textContent = "Reset";
  generateCarsBtn.textContent = "Generate Cars";
  parentElement.append(raceBtn, resetBtn, generateCarsBtn);
}

function drawMainBlock(parentElement: HTMLElement) {
  const h2El = <HTMLHeadingElement>document.createElement("h2");
  const namePage = <HTMLSpanElement>document.createElement("span");
  const allAmountCarInGarage = <HTMLSpanElement>document.createElement("span");
  const pageNumberLine = <HTMLParagraphElement>document.createElement("p");
  const pageName = <HTMLSpanElement>document.createElement("span");
  const pageNumeric = <HTMLSpanElement>document.createElement("span");
  const carBlocksWrapper = <HTMLDivElement>document.createElement("div");
  const paginationLine = <HTMLDivElement>document.createElement("div");
  const prevBtn = <HTMLButtonElement>document.createElement("button");
  const nextBtn = <HTMLButtonElement>document.createElement("button");
  prevBtn.className = nextBtn.className = "btn";
  prevBtn.textContent = "Prev";
  nextBtn.textContent = "Next";
  prevBtn.dataset.btn = "prev";
  nextBtn.dataset.btn = "next";
  h2El.append(namePage, allAmountCarInGarage);
  pageNumberLine.append(pageName, pageNumeric);
  paginationLine.append(prevBtn, nextBtn);
  drawContentBlocks(carBlocksWrapper);
  parentElement.append(h2El, pageNumberLine, carBlocksWrapper, paginationLine);
}

function drawContentBlocks(parentElement: HTMLElement, isCarBlock = true) {
  isCarBlock ? drawCarBlocks(parentElement) : drawWinnersBlocks(parentElement);
}

function drawWinnersBlocks(parentElement: HTMLElement) {
  const tableWinners = <HTMLTableElement>document.createElement("table");
  const tableHeader = <HTMLTableSectionElement>document.createElement("thead");
  const trHeader = <HTMLTableRowElement>document.createElement("tr");
  const headerColumns = ["Number", "Car", "Name", "Wins", "Best Time(sec)"];
  headerColumns.forEach((el: string) => {
    const th = <HTMLTableCellElement>document.createElement("th");
    th.className = "column-header";
    th.textContent = el;
    trHeader.appendChild(th);
  });
  tableWinners.append(tableHeader);
  parentElement.append(tableWinners);
}

function drawCarBlocks(parentElement: HTMLElement) {
  const carBlock = <HTMLDivElement>document.createElement("div");
  const controlSingleCarLine = <HTMLDivElement>document.createElement("div");
  const selectBtn = <HTMLButtonElement>document.createElement("button");
  const removeBtn = <HTMLButtonElement>document.createElement("button");
  const nameCar = <HTMLHeadingElement>document.createElement("h3");
  const carRaceWrapper = <HTMLDivElement>document.createElement("div");
  const btnLine = <HTMLParagraphElement>document.createElement("p");
  const startBtn = <HTMLButtonElement>document.createElement("button");
  const stopBtn = <HTMLButtonElement>document.createElement("button");
  const racingBlock = <HTMLDivElement>document.createElement("div");
  const carMove = <HTMLDivElement>document.createElement("div");
  const carImg = <HTMLElement>document.createElement("img");
  const flagImg = <HTMLElement>document.createElement("img");
  const landline = <HTMLParagraphElement>document.createElement("p");
  carBlock.className = "car";
  controlSingleCarLine.className = "car__control-line";
  selectBtn.className = removeBtn.className = "btn";
  selectBtn.dataset.btn = "select";
  removeBtn.dataset.btn = "remove";
  nameCar.className = "car__name";
  carRaceWrapper.className = "car-race-wrapper";
  btnLine.className = "car-race-btn-line";
  startBtn.className = "car__engine-btn btn";
  stopBtn.className = "car__engine-btn btn";
  startBtn.dataset.btn = "start";
  stopBtn.dataset.btn = "stop";
  racingBlock.className = "racing-block";
  carMove.className = "car-move";
  carImg.className = "car__img";
  flagImg.className = "car__flag-img";
  landline.className = "car__land-line";
  selectBtn.textContent = "Select";
  removeBtn.textContent = "Remove";
  startBtn.textContent = "A";
  stopBtn.textContent = "B";
  controlSingleCarLine.append(selectBtn, removeBtn, nameCar);
  btnLine.append(startBtn, stopBtn);
  carMove.appendChild(carImg);
  racingBlock.append(carMove, flagImg);
  carRaceWrapper.append(btnLine, racingBlock, landline);
  carBlock.append(controlSingleCarLine, carRaceWrapper);
  parentElement.appendChild(carBlock);
}

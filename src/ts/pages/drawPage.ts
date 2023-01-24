import { CarData } from "../type";

export function drawMainPage(): void {
  const mainPageFragment = <DocumentFragment>document.createDocumentFragment();
  const allWrapperEl = <HTMLDivElement>document.createElement("div");
  const menuLineEl = <HTMLDivElement>document.createElement("div");
  const controlCarUlEl = <HTMLUListElement>document.createElement("ul");
  const controlRaceLineEl = <HTMLDivElement>document.createElement("div");
  const mainEl = <HTMLElement>document.createElement("main");
  const footer = <HTMLElement>document.createElement("footer");
  allWrapperEl.className = "all-wrapper";
  menuLineEl.className = "page-btns";
  controlCarUlEl.className = "car-control-block";
  controlRaceLineEl.className = "control-race";
  mainEl.className = "main garage";
  footer.className = "footer";
  drawMenu(menuLineEl);
  drawControlBlock(controlCarUlEl);
  drawControlRaceLine(controlRaceLineEl);
  drawMainBlock(mainEl);
  getFooter(footer);
  allWrapperEl.append(
    menuLineEl,
    controlCarUlEl,
    controlRaceLineEl,
    mainEl,
    footer
  );
  mainPageFragment.append(allWrapperEl);
  document.body.append(mainPageFragment);
}

export function drawMenu(parentElement: HTMLElement): void {
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
    inputColor.value = "#ff0000";
    inputName.type = "text";
    inputColor.type = "color";
    btn.className = "btn";
    if (i === 0) {
      btn.textContent = "Create";
      btn.dataset.btn = "create";
      li.dataset.type = "create";
    } else {
      btn.textContent = "Update";
      btn.dataset.btn = "update";
      li.dataset.type = "update";
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
  raceBtn.dataset.btn = "race";
  resetBtn.dataset.btn = "reset";
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
  const currentPage = <HTMLSpanElement>document.createElement("span");
  const nextBtn = <HTMLButtonElement>document.createElement("button");
  h2El.className = "h2";
  namePage.className = "name-page";
  allAmountCarInGarage.className = "all-amount";
  currentPage.className = "current-page";
  prevBtn.className = nextBtn.className = "btn";
  carBlocksWrapper.className = "car-blocks-wrapper";
  paginationLine.className = "pagination-line";
  prevBtn.textContent = "Prev";
  nextBtn.textContent = "Next";
  prevBtn.dataset.btn = "prev";
  nextBtn.dataset.btn = "next";
  h2El.append(namePage, allAmountCarInGarage);
  pageNumberLine.append(pageName, pageNumeric);
  paginationLine.append(prevBtn, currentPage, nextBtn);
  parentElement.append(h2El, pageNumberLine, carBlocksWrapper, paginationLine);
}

export function drawCarBlock(parentElement: HTMLElement, carData: CarData) {
  const { name, color, id } = carData;
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
  carBlock.dataset.id = carMove.dataset.id = String(id);
  racingBlock.className = "racing-block";
  carMove.className = "car-move";
  flagImg.className = "car__flag-img";
  landline.className = "car__land-line";
  selectBtn.textContent = "Select";
  removeBtn.textContent = "Remove";
  startBtn.textContent = "A";
  stopBtn.textContent = "B";
  nameCar.textContent = name;
  getCarSVG(carMove, color);
  controlSingleCarLine.append(selectBtn, removeBtn, nameCar);
  btnLine.append(startBtn, stopBtn);
  racingBlock.append(carMove, flagImg);
  carRaceWrapper.append(btnLine, racingBlock, landline);
  carBlock.append(controlSingleCarLine, carRaceWrapper);
  parentElement.appendChild(carBlock);
}
function getFooter(parentElement: HTMLElement): void {
  parentElement.innerHTML = ` <div class="footer__container">
                                  <div>
                                    <a href="https://rs.school/" class="footer__rs-logo">
                                    </a>
                                  </div>
                                  <div class="footer__title">
                                    <a href="/">Async Race 2023</a>
                                  </div>
                                  <div class="footer__github">
                                    <span class="footer__creators">
                                      <span class="footer__github-logo">
                                        <!--<img src="../assets/github-logo.svg" alt="github logo">-->
                                      </span>
                                      <a href="https://github.com/dairinka" class="footer__contributor">@dairinka</a>
                                    </span>
                                  </div>
                                </div>`;
}
export function getCarSVG(
  parentElement: HTMLElement,
  color: string,
  width = 100,
  height = 50
): void {
  parentElement.innerHTML = `<svg width="${width}" height="${height}" viewBox="0 0 100 50" fill="${color}" xmlns="http://www.w3.org/2000/svg" class="car__img">
  <path d="M27.8516 8.3125C27.0234 8.54688 27.0625 8.51563 27.0078 9.17969C26.9766 9.50782 26.9375 9.80469 26.9141 9.84375C26.8672 9.92188 24.9922 10.6641 22.3047 11.6719C18.8047 12.9766 14.0859 14.9141 13.1406 15.4453C12.5313 15.7813 11.6328 16.1563 11.1875 16.2578C11.0078 16.2969 10.4219 16.3672 9.89844 16.4063C9.375 16.4531 8.59375 16.5547 8.16406 16.6406C6.96094 16.8828 5.50781 17.0234 3.76563 17.0859L2.17969 17.1328L1.84375 17.6484C1.38281 18.3594 1.375 18.3906 1.64063 18.6641C1.92969 18.9531 1.9375 19.1719 1.66406 19.8359C1.46875 20.3203 1.45313 20.4453 1.42188 21.8359L1.39063 23.3203L1.09375 23.5703C0.382813 24.1797 0.0546875 25.2031 0.046875 26.8359C0.046875 28.3516 0.132813 29.9297 0.25 30.6016C0.351563 31.1563 0.359375 31.1797 0.8125 31.5547C1.35156 32.0078 1.82813 32.5625 2.04688 32.9922C2.54688 33.9766 6.21875 34.6406 12.8594 34.9453L13.5781 34.9766L13.5313 34.0469C13.4844 32.9375 13.5938 32.0469 13.9141 31.0547C14.7891 28.3047 16.9922 26.1953 19.8203 25.4141C20.5234 25.2109 20.6953 25.1953 21.9922 25.1953C23.2813 25.1953 23.4609 25.2109 24.1641 25.4063C25.7344 25.8438 26.9844 26.5938 28.1016 27.7656C29.1953 28.8984 29.8359 30.0547 30.2422 31.6094C30.4063 32.2266 30.4297 32.4609 30.4219 33.7891C30.4141 34.7813 30.375 35.4609 30.2969 35.8438L30.1797 36.4141L53.6641 36.3594C66.5781 36.3281 77.1563 36.2969 77.1719 36.2891C77.1797 36.2813 77.1094 36 77.0156 35.6563C76.8672 35.1328 76.8438 34.8359 76.8438 33.6328C76.8359 32.3359 76.8516 32.1719 77.0547 31.4531C77.9688 28.1641 80.7031 25.7031 83.9688 25.2266C84.8984 25.0938 86.5078 25.1719 87.3438 25.3906C89.2109 25.8828 90.8828 26.9922 92.0391 28.5078C92.5859 29.2266 93.2422 30.5938 93.4844 31.5234C93.6719 32.2109 93.6953 32.4531 93.6953 33.5547C93.7031 34.4609 93.6641 34.9688 93.5703 35.3828C93.4922 35.7031 93.4453 35.9688 93.4531 35.9766C93.4688 35.9844 93.9375 35.9609 94.4922 35.9297C96.5703 35.8047 98.0703 35.5781 98.5938 35.3125C98.9688 35.125 99.3516 34.6797 99.5859 34.1719L99.7734 33.7656L99.6484 32.5391C99.5313 31.3516 99.5313 31.2656 99.6797 30.3203C100.172 27.2891 100.07 25.0078 99.4063 24.0547C98.3594 22.5469 95.2969 21.4297 88.2422 20C82.4844 18.8359 77.9141 18.3672 72.3594 18.3594C70.5781 18.3594 70.5938 18.3594 69.6484 17.6953C68.1875 16.6719 61.4844 12.9531 58.1563 11.3281C55.1641 9.86719 52 9.13282 46.9141 8.73438C45.2891 8.60157 38.2734 8.60938 35.9766 8.73438C35.0313 8.78907 33.5234 8.88282 32.6172 8.94532C30.2578 9.11719 30.3828 9.11719 29.9531 8.86719C28.8594 8.23438 28.4922 8.13282 27.8516 8.3125ZM42.5781 10.9141C42.625 11.2031 42.875 12.7734 43.1328 14.3984C43.3828 16.0313 43.6484 17.6953 43.7188 18.1016C43.7891 18.5078 43.8359 18.8516 43.8203 18.8594C43.7344 18.9297 30.5469 18.6328 28.5781 18.5156C26.9688 18.4141 25.3203 18.2344 24.7891 18.0938C24.0234 17.8906 23.2422 17.1641 22.8438 16.2891C22.5703 15.7031 22.5625 14.9453 22.8047 14.2969C22.9375 13.9453 23.0391 13.8203 23.3359 13.625C23.9844 13.2031 24.3906 13 25.3125 12.6328C27.9766 11.5703 32.0156 10.8359 36.7188 10.5469C38.8203 10.4219 38.8281 10.4219 40.7109 10.4063L42.4844 10.3906L42.5781 10.9141ZM47.5 10.5469C49.5625 10.6875 53.5703 11.4063 55.5391 12C56.9922 12.4375 59.0156 13.4688 61.4453 15.0234C63.0938 16.0703 63.5859 16.4375 63.3984 16.4688C62.8125 16.5625 62.3594 16.8594 62.1328 17.2969C61.9844 17.5703 61.9688 18.3594 62.1016 18.6953L62.1875 18.9063L55.1016 18.8906L48.0234 18.8672L47.5625 17.6172C46.7031 15.2578 45.2344 10.7578 45.2344 10.4609C45.2344 10.4141 45.9766 10.4453 47.5 10.5469Z" />
  <path d="M20.5703 25.5859C18.8281 25.8984 17.3672 26.6875 16.1328 27.9766C15.1016 29.0547 14.4687 30.1875 14.0859 31.625C13.9141 32.2734 13.8828 32.5547 13.8828 33.5547C13.875 34.875 13.9609 35.3984 14.3906 36.5391C15.0703 38.3359 16.5078 39.9453 18.2422 40.8437C18.9062 41.1875 19.6328 41.4531 20.3594 41.6094C21.1953 41.7891 22.7969 41.7891 23.6328 41.6016C26.6953 40.9453 29.0937 38.6719 29.8984 35.6562C30.0781 34.9844 30.1016 34.7187 30.1094 33.6719C30.1172 32.4375 30.0703 32.1172 29.75 31.0937C28.9844 28.6719 26.9766 26.6641 24.5312 25.8672C23.3594 25.4766 21.7656 25.3672 20.5703 25.5859ZM23.3047 27.9375C25.25 28.375 26.875 29.8672 27.5469 31.8359C27.7422 32.3984 27.7656 32.5781 27.7656 33.5547C27.7734 34.75 27.6484 35.3359 27.1875 36.25C26.4531 37.7031 24.9766 38.8828 23.3984 39.2656C22.6484 39.4531 21.3047 39.4531 20.5859 39.2656C18.0859 38.6094 16.3359 36.4922 16.1953 33.9453C16.0391 31.1406 17.8281 28.6875 20.5547 27.9687C21.2891 27.7812 22.5312 27.7656 23.3047 27.9375Z" />
  <path d="M20.3125 28.9297C20.0313 29.0313 19.6484 29.2109 19.4609 29.3281L19.1172 29.5469L20.0234 30.4453C20.6563 31.0859 20.9609 31.3359 21.0469 31.3047C21.1563 31.2578 21.1719 31.0781 21.1719 30C21.1719 28.5469 21.2188 28.6094 20.3125 28.9297Z" />
  <path d="M22.8125 29.9922C22.8125 31.0781 22.8281 31.2578 22.9375 31.3047C23.0234 31.3359 23.3281 31.0859 23.9531 30.4609L24.8516 29.5703L24.6328 29.3984C24.3672 29.1797 23.5547 28.8516 23.125 28.7813L22.8125 28.7266V29.9922Z" />
  <path d="M17.8281 30.875C17.6094 31.1562 17.1094 32.3672 17.1094 32.6328C17.1094 32.7109 17.375 32.7344 18.3984 32.7344C19.5781 32.7344 19.6875 32.7266 19.6875 32.5937C19.6875 32.4766 18.0781 30.7812 17.9609 30.7812C17.9297 30.7812 17.875 30.8281 17.8281 30.875Z" />
  <path d="M25.1719 31.6328C24.6875 32.0937 24.2969 32.5312 24.2969 32.6016C24.2969 32.7187 24.4297 32.7344 25.5859 32.7344C26.6094 32.7344 26.875 32.7109 26.875 32.6328C26.875 32.3203 26.3359 31.0312 26.1328 30.8594C26.0781 30.8125 25.7578 31.0703 25.1719 31.6328Z" />
  <path d="M21.7266 31.7812C21.6328 31.9531 21.8125 32.2656 21.9922 32.2656C22.0547 32.2656 22.1563 32.1875 22.2188 32.0937C22.375 31.875 22.25 31.6406 21.9922 31.6406C21.8906 31.6406 21.7656 31.7031 21.7266 31.7812Z" />
  <path d="M21.4766 33.1172C21.2266 33.375 21.1875 33.6406 21.3672 33.9766C21.5938 34.4219 22.1797 34.4766 22.5469 34.0859C22.9609 33.6406 22.6172 32.8906 21.9922 32.8906C21.7813 32.8906 21.6484 32.9531 21.4766 33.1172Z" />
  <path d="M20.0781 33.3984C19.875 33.6484 20.1797 34.0313 20.4531 33.8594C20.6406 33.7344 20.6641 33.5078 20.5 33.3828C20.3203 33.25 20.1953 33.2578 20.0781 33.3984Z" />
  <path d="M23.4844 33.4062C23.3281 33.5547 23.3281 33.7031 23.4688 33.8281C23.6484 33.9766 23.9453 33.8906 23.9688 33.6875C24.0234 33.3437 23.7188 33.1641 23.4844 33.4062Z" />
  <path d="M17.1094 34.5703C17.1094 34.7969 17.4297 35.6641 17.6719 36.0859L17.9141 36.5L18.8281 35.5859C19.3828 35.0313 19.7344 34.625 19.7109 34.5625C19.6797 34.4766 19.3984 34.4531 18.3906 34.4531C17.2891 34.4531 17.1094 34.4688 17.1094 34.5703Z" />
  <path d="M24.2969 34.5938C24.2969 34.6641 24.6953 35.125 25.1875 35.6172L26.0781 36.5078L26.3203 36.0859C26.5547 35.6875 26.875 34.7969 26.875 34.5625C26.875 34.4766 26.6328 34.4531 25.5859 34.4531C24.4062 34.4531 24.2969 34.4609 24.2969 34.5938Z" />
  <path d="M21.7188 35.1484C21.6641 35.2656 21.6797 35.3359 21.7813 35.4688C22.0313 35.7813 22.4453 35.5 22.2656 35.1484C22.1563 34.9531 21.8281 34.9531 21.7188 35.1484Z" />
  <path d="M20.0156 36.7422C19.5391 37.2266 19.1406 37.6406 19.1406 37.6719C19.1406 37.8125 20.7656 38.5156 21.0859 38.5156C21.1406 38.5156 21.1719 38.0938 21.1719 37.2344C21.1719 36.1406 21.1563 35.9453 21.0469 35.9063C20.9766 35.8828 20.9219 35.8594 20.9141 35.8594C20.9063 35.8594 20.5 36.2578 20.0156 36.7422Z" />
  <path d="M22.9141 35.9141C22.7969 35.9609 22.7656 38.5156 22.8828 38.5156C23.2422 38.5156 24.8438 37.8281 24.8438 37.6719C24.8438 37.6016 23.1016 35.8594 23.0469 35.8672C23.0234 35.8672 22.9609 35.8906 22.9141 35.9141Z" />
  <path d="M83.5937 25.6328C80.5469 26.2891 78.1562 28.5703 77.3672 31.5625C77.125 32.4766 77.0469 33.8437 77.1797 34.7734C77.4375 36.5469 78.3516 38.3125 79.6641 39.5313C81.75 41.4844 84.6875 42.2188 87.4219 41.4766C88.3359 41.2266 89.6328 40.5547 90.3906 39.9453C94.1953 36.8516 94.4375 31.1328 90.9141 27.7578C90.1562 27.0312 89.6172 26.6641 88.6484 26.2109C87.5781 25.7109 86.8125 25.5391 85.4688 25.5C84.5312 25.4766 84.2031 25.5 83.5937 25.6328ZM87.0703 28.0781C88.9297 28.7109 90.2656 30.0937 90.8672 32.0312C91.1016 32.7812 91.125 34.2891 90.9062 35.0625C90.0469 38.1875 86.8984 40.0391 83.7891 39.25C82.625 38.9531 81.3437 38.1016 80.6484 37.1641C79.2734 35.3047 79.0625 33 80.0937 30.9375C80.3594 30.3984 80.5625 30.1328 81.1719 29.5312C81.7734 28.9219 82.0391 28.7187 82.5859 28.4453C83.5937 27.9375 84.2031 27.8125 85.4297 27.8437C86.2812 27.8672 86.5469 27.8984 87.0703 28.0781Z" />
  <path d="M83.6172 28.9063C83.1953 29.0547 82.4219 29.4609 82.4219 29.5313C82.4219 29.5547 82.8203 29.9766 83.3125 30.4609C83.9375 31.0859 84.2422 31.3359 84.3281 31.3047C84.4375 31.2656 84.4531 31.0781 84.4531 30V28.75L84.2422 28.7578C84.1172 28.7578 83.8359 28.8281 83.6172 28.9063Z" />
  <path d="M86.0938 29.9922C86.0938 31.0781 86.1094 31.2578 86.2188 31.3047C86.3906 31.3672 88.1484 29.6172 88.0469 29.4922C87.9141 29.3359 86.7734 28.8359 86.4297 28.7813L86.0938 28.7266V29.9922Z" />
  <path d="M80.9844 31.0625C80.7578 31.4062 80.3906 32.3516 80.3906 32.5781C80.3906 32.7266 80.4453 32.7344 81.6797 32.7344C82.6641 32.7344 82.9688 32.7109 82.9688 32.6328C82.9688 32.5781 82.5703 32.1406 82.0781 31.6484L81.1875 30.7578L80.9844 31.0625Z" />
  <path d="M88.3828 31.6563C87.9062 32.1406 87.5312 32.5859 87.5547 32.6328C87.6016 32.75 90.1562 32.7813 90.1562 32.6641C90.1562 32.3125 89.4687 30.7813 89.3125 30.7813C89.2812 30.7813 88.8672 31.1797 88.3828 31.6563Z" />
  <path d="M85.0156 31.7344C84.8828 31.8672 84.8984 31.9844 85.0703 32.1406C85.1953 32.25 85.25 32.2578 85.3906 32.1875C85.6328 32.0547 85.5781 31.6875 85.3125 31.6563C85.2031 31.6406 85.0703 31.6797 85.0156 31.7344Z" />
  <path d="M84.7344 33.1328C84.2031 33.7656 84.8672 34.6484 85.5938 34.2578C86.2891 33.8828 86.0313 32.8906 85.2344 32.8906C85 32.8906 84.8906 32.9375 84.7344 33.1328Z" />
  <path d="M83.3594 33.3906C83.2109 33.5703 83.2969 33.8672 83.5 33.8906C83.8438 33.9453 84.0234 33.6406 83.7813 33.4063C83.6328 33.25 83.4844 33.25 83.3594 33.3906Z" />
  <path d="M86.7656 33.3828C86.6016 33.5078 86.625 33.7344 86.8203 33.8594C87.1094 34.0391 87.4219 33.5859 87.1406 33.3828C87.0625 33.3281 86.9766 33.2813 86.9531 33.2813C86.9297 33.2813 86.8438 33.3281 86.7656 33.3828Z" />
  <path d="M80.3906 34.6094C80.3906 34.8359 80.7266 35.7109 80.9688 36.1328L81.1875 36.5078L82.0938 35.6016C82.7266 34.9688 82.9766 34.6641 82.9453 34.5781C82.8984 34.4688 82.7188 34.4531 81.6406 34.4531C80.4531 34.4531 80.3906 34.4609 80.3906 34.6094Z" />
  <path d="M87.5547 34.5469C87.5313 34.6016 87.9219 35.0625 88.4219 35.5625L89.3281 36.4844L89.5391 36.1484C89.75 35.8047 90.1563 34.7656 90.1563 34.5625C90.1563 34.4687 89.9375 34.4531 88.875 34.4531C87.9219 34.4531 87.5781 34.4766 87.5547 34.5469Z" />
  <path d="M85.0078 35.1484C84.8984 35.3438 84.9688 35.5234 85.1641 35.5859C85.375 35.6563 85.5625 35.4844 85.5313 35.2422C85.5 34.9766 85.1328 34.9063 85.0078 35.1484Z" />
  <path d="M83.2969 36.7422C82.8203 37.2266 82.4219 37.6406 82.4219 37.6719C82.4219 37.8281 83.9922 38.5156 84.3516 38.5156C84.4297 38.5156 84.4531 38.25 84.4531 37.2344C84.4531 36.1406 84.4375 35.9453 84.3281 35.9063C84.2578 35.8828 84.2031 35.8594 84.1953 35.8594C84.1875 35.8594 83.7813 36.2578 83.2969 36.7422Z" />
  <path d="M86.1953 35.9141C86.1172 35.9375 86.0938 36.2813 86.0938 37.2344C86.0938 37.9375 86.125 38.5156 86.1562 38.5156C86.4375 38.5156 87.6094 38.0391 88.0234 37.75C88.1484 37.6719 86.3359 35.8594 86.1953 35.9141Z" />
  </svg>
  `;
}

export function hiddenMainPage() {
  const allWrapper = <HTMLElement>document.querySelector(".all-wrapper");
  allWrapper.classList.add("hidden");
}

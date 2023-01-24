export function loadGarageData(amount: string, page: string): void {
  const namePage = <HTMLElement>document.querySelector(".name-page");
  namePage.textContent = "Garage";
  updateAmountOnPage(amount);
  updateCountPage(page);
}

export function updateCountPage(page: string): void {
  const currentPage = <HTMLElement>document.querySelector(".current-page");
  currentPage.textContent = page;
}

export function updateAmountOnPage(amount: string): void {
  const allAmount = <HTMLElement>document.querySelector(".all-amount");
  allAmount.textContent = amount;
}

export function nonActiveBtn(btn: HTMLElement): void {
  btn.classList.add("non-active");
}

export function activeBtn(btn: HTMLElement): void {
  btn.classList.remove("non-active");
}

export function checkActivePageBtn(page: number, allPage: number) {
  const nextBtn = <HTMLElement>document.querySelector("[data-btn='next']");
  const prevtBtn = <HTMLElement>document.querySelector("[data-btn='prev']");
  if (page === allPage) {
    nonActiveBtn(nextBtn);
  } else if (page === 1) {
    nonActiveBtn(prevtBtn);
  } else {
    activeBtn(nextBtn);
    activeBtn(prevtBtn);
  }
}

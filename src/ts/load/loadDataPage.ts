export function loadGarageData(amount: string, page: string): void {
  const namePage = <HTMLElement>document.querySelector(".name-page");
  const allAmount = <HTMLElement>document.querySelector(".all-amount");
  namePage.textContent = "Garage";
  allAmount.textContent = amount;
  updateCountPage(page);
}

export function updateCountPage(page: string): void {
  const currentPage = <HTMLElement>document.querySelector(".current-page");
  currentPage.textContent = page;
}

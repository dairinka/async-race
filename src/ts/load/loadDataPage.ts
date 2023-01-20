export function loadGarageData(amount: string, page: string): void {
  const namePage = <HTMLElement>document.querySelector(".name-page");
  const allAmount = <HTMLElement>document.querySelector(".all-amount");
  const currentPage = <HTMLElement>document.querySelector(".current-page");
  namePage.textContent = "Garage";
  allAmount.textContent = amount;
  currentPage.textContent = page;
}

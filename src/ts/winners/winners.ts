import { Base } from "../type";

class Winners {
  baseUrl: string;
  limit: string;
  constructor() {
    this.baseUrl = Base.baseUrl;
    this.limit = Base.limitWinners;
  }
  private normalizeId(id: string): number {
    let result: number;
    if (isNaN(Number(id))) {
      result = JSON.parse(JSON.stringify(id)).slice(1, id.length - 1);
    } else {
      result = Number(id);
    }
    return result;
  }
  // public async getWinners(page: string): Promise<WinnersData> {
  //   const currentPage = this.normalizeId(page);
  //   const url = `${this.baseUrl}/winners?_page=${currentPage}`;
  // }
}

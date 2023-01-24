import { Base, SortOrder, WinnersData, WinnersSort } from "../type";

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
  public async allAmountWinners(): Promise<string> {
    const url = `${this.baseUrl}/winners?_page=1&_limit=10`;
    const response: Response = await fetch(url);
    const allWinAmount = response.headers.get("X-Total-Count");
    return String(allWinAmount);
  }

  public async getWinners(
    page: number,
    sort = WinnersSort.time,
    order = SortOrder.up
  ): Promise<WinnersData[]> {
    const limit = this.normalizeId(this.limit);
    const url = `${this.baseUrl}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response: Response = await fetch(url);
    const data = response.json();
    return data;
  }
  public async createWinner(body: WinnersData): Promise<void> {
    const url = `${this.baseUrl}/winners`;
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  public async getWinner(winnerId: string): Promise<WinnersData> {
    const id = this.normalizeId(winnerId);
    const url = `${this.baseUrl}/winners/${id}`;
    const response: Response = await fetch(url);
    const data: JSON = await response.json();
    const winnerData: WinnersData = JSON.parse(JSON.stringify(data));
    return winnerData;
  }
  public async updateWinner(
    winnerId: string,
    body: WinnersData
  ): Promise<void> {
    const id = this.normalizeId(winnerId);
    const url = `${this.baseUrl}/winners/${id}`;
    const response: Response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  public async deleteWinner(carId: string): Promise<void> {
    const id = this.normalizeId(carId);
    const url = `${this.baseUrl}/winners/${id}`;
    const response: Response = await fetch(url, {
      method: "DELETE",
    });
    const data: JSON = await response.json();
  }
}
export default Winners;

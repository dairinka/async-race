import { Path, PageQueryParams, AllCarData, CarData } from "../type";
class ServerData {
  baseUrl: string;
  // limit: number;
  // constructor(...args: ServerTuple) {
  //   const [limit, baseUrl] = args;
  //   this.baseUrl = baseUrl;
  //   this.limit = limit;
  // }
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private generateQueryString(queryParams: PageQueryParams[]): string {
    const arr = queryParams.map((x) => {
      return Object.entries(x).reduce((acc, el) => {
        return `${el[0]}=${el[1]}`;
      }, "");
    });
    return queryParams.length ? `?${arr.join("&")}}` : "";
  }

  public async isConnect(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}`;
      await fetch(url);
    } catch {
      return false;
    }
    return true;
  }

  public async getCars(queryParams: PageQueryParams[]): Promise<AllCarData> {
    const url = `${this.baseUrl}${Path.garage}${this.generateQueryString(
      queryParams
    )}`;
    const response: Response = await fetch(url);
    const allCarAmount = response.headers.get("X-Total-Count");
    const data: string = await response.json();
    const carData: CarData[] = JSON.parse(JSON.stringify(data));
    const allCarData: AllCarData = {
      carArr: carData,
      allAmountCar: String(allCarAmount),
    };
    console.log("allCarData", allCarData);
    return allCarData;
  }

  public async getCar(id: number): Promise<JSON> {
    const url = `${this.baseUrl}${Path.garage}/${id}`;

    const response: Response = await fetch(url);
    const data: JSON = await response.json();
    console.log("data", data);
    return data;
  }

  public async createCar(body: CarData) {
    const url = `${this.baseUrl}${Path.garage}`;

    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: JSON = await response.json();
    console.log("data", data);
    return data;
  }
}

export default ServerData;

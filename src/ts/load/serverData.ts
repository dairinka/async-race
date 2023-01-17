import { Path, ServerTuple, PageQueryParams, CarData } from "../type";
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

  private generateQueryString(queryParams: PageQueryParams[] = []): string {
    return queryParams.length
      ? `? ${queryParams.map((x) => `${x.key}=${x.value}`).join("&")}`
      : "";
  }

  public async getCars(queryParams: PageQueryParams[] = []): Promise<JSON> {
    const url = `${this.baseUrl}${Path.garage}${this.generateQueryString(
      queryParams
    )}`;

    const response: Response = await fetch(url);
    const data: JSON = await response.json();
    console.log("data", data);
    return data;
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

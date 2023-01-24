import { Path, PageQueryParams, CarData } from "../type";
class ServerData {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private generateQueryString(queryParams: PageQueryParams[]): string {
    const arr = queryParams.map((x) => {
      return Object.entries(x).reduce((acc, el) => {
        const value = this.normalizeId(el[1]);
        return `${el[0]}=${value}`;
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

  public async getCarsAmount(queryParams: PageQueryParams[]): Promise<string> {
    const url = `${this.baseUrl}${Path.garage}${this.generateQueryString(
      queryParams
    )}`;
    const response: Response = await fetch(url);
    const allCarAmount = response.headers.get("X-Total-Count");
    return String(allCarAmount);
  }

  public async getCars(queryParams: PageQueryParams[]): Promise<CarData[]> {
    const url = `${this.baseUrl}${Path.garage}${this.generateQueryString(
      queryParams
    )}`;
    const response: Response = await fetch(url);
    const data: string = await response.json();
    const carData: CarData[] = JSON.parse(JSON.stringify(data));
    return carData;
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

  public async getCar(id: string): Promise<CarData> {
    const carId = this.normalizeId(id);
    const url = `${this.baseUrl}${Path.garage}/${carId}`;
    const response: Response = await fetch(url);
    const data: JSON = await response.json();
    const carData: CarData = JSON.parse(JSON.stringify(data));
    return carData;
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
    return data;
  }

  public async updateCar(carId: string, carName: string, carColor: string) {
    console.log("(((((((updateCar on server)))))))");
    console.log("carId", carId);
    console.log("carName", carName);
    console.log("carColor", carColor);
    const id = this.normalizeId(carId);
    const url = `${this.baseUrl}${Path.garage}/${id}`;
    console.log("url", url);
    const body = {
      name: carName,
      color: carColor,
    };
    console.log("body", body);
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  public async removeCar(carId: string): Promise<void> {
    const id = this.normalizeId(carId);
    const url = `${this.baseUrl}${Path.garage}/${id}`;
    await fetch(url, {
      method: "DELETE",
    });
  }
}

export default ServerData;

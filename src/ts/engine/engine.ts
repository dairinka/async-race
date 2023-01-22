import { Path, EngineData, EngineStatus, ServerStatus } from "../type";
class Engine {
  baseUrl: string;
  controller: AbortController;
  //signal: AbortController["signal"];
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.controller = new AbortController();
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

  public async start(carId: string): Promise<EngineData> {
    const id = this.normalizeId(carId);
    const url = `${this.baseUrl}${Path.engine}?id=${id}&status=${EngineStatus.start}`;
    const response: Response = await fetch(url, {
      method: "PATCH",
    });
    const data: string = await response.json();
    const engineData: EngineData = JSON.parse(JSON.stringify(data));
    return engineData;
  }

  public async go(carId: string): Promise<ServerStatus> {
    const id = this.normalizeId(carId);
    const url = `${this.baseUrl}${Path.engine}?id=${id}&status=${EngineStatus.drive}`;
    const response: Response = await fetch(url, {
      signal: this.controller.signal,
      method: "PATCH",
    });
    const serverStatus: ServerStatus = response.status;
    console.log(response.status);
    // const data: string = await response.json();
    // const engineData: EngineData = JSON.parse(JSON.stringify(data));
    return serverStatus;
  }

  public abortConnect() {
    this.controller.abort();
  }
}

export default Engine;

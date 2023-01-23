import { fireCar, stopCar } from "../animation/animate";
import { Path, EngineData, EngineStatus, ServerStatus, Winner } from "../type";
import AnimationCar from "../animation/animateCar";
import { ServerMessage } from "../type";
import { showMessage, showWinner } from "../message/message";
class Engine {
  baseUrl: string;
  controller: AbortController;
  carId: string;
  //signal: AbortController["signal"];
  constructor(baseUrl: string, carId: string) {
    this.baseUrl = baseUrl;
    this.controller = new AbortController();
    this.carId = carId;
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

  public async start(): Promise<EngineData> {
    const id = this.normalizeId(this.carId);
    const url = `${this.baseUrl}${Path.engine}?id=${id}&status=${EngineStatus.start}`;
    const response: Response = await fetch(url, {
      method: "PATCH",
    });
    const data: string = await response.json();
    const engineData: EngineData = JSON.parse(JSON.stringify(data));
    return engineData;
  }

  public async go(animationCar: AnimationCar): Promise<ServerStatus> {
    const id = this.normalizeId(this.carId);
    const url = `${this.baseUrl}${Path.engine}?id=${id}&status=${EngineStatus.drive}`;
    const response: Response = await fetch(url, {
      signal: this.controller.signal,
      method: "PATCH",
    });
    const serverStatus: ServerStatus = response.status;
    console.log(response.status);
    if (serverStatus === ServerStatus.carStop) {
      stopCar(animationCar, this.carId);
      //showMessage(ServerMessage.carStop, this.carId);
      fireCar(this.carId);
    }
    // const data: string = await response.json();
    // const engineData: EngineData = JSON.parse(JSON.stringify(data));
    return serverStatus;
  }
  public async goRace(
    animationCar: AnimationCar
  ): Promise<ServerStatus | Winner> {
    const id = this.normalizeId(this.carId);
    const url = `${this.baseUrl}${Path.engine}?id=${id}&status=${EngineStatus.drive}`;
    return new Promise(async (resolve, reject) => {
      const startTime = performance.now();
      const response: Response = await fetch(url, {
        signal: this.controller.signal,
        method: "PATCH",
      });
      const serverStatus: ServerStatus = response.status;
      console.log(response.status);
      switch (serverStatus) {
        case ServerStatus.ok:
          const endTime = performance.now();
          const timeRace = ((endTime - startTime) / 1000).toFixed(2);
          const result: Winner = {
            carId: this.carId,
            time: timeRace,
            status: serverStatus,
          };
          resolve(result);
          break;
        case ServerStatus.tooManyRequest:
          showMessage(ServerMessage.tooManyRequest, this.carId);
          break;
        case ServerStatus.carStop:
          //showMessage(ServerMessage.carStop, this.carId);
          stopCar(animationCar, this.carId);
          fireCar(this.carId);
          reject(ServerStatus.carStop);
          break;
      }
    });
  }

  public abortConnect() {
    this.controller.abort();
  }
  public newConnect() {
    this.controller.signal;
  }
}

export default Engine;

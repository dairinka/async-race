import { EngineData } from "../type";
class AnimationCar {
  globalAnimateId: number;
  carId: string;
  engineData: EngineData;
  constructor(carId: string, engineData: EngineData) {
    this.globalAnimateId = 0;
    this.carId = carId;
    this.engineData = engineData;
  }

  public startAnimationCar(): void {
    const carBlock = <HTMLElement>(
      document.querySelector(`[data-id="${this.carId}"]`)
    );
    const blockRacing = <HTMLElement>carBlock.querySelector(".racing-block");
    const endX = blockRacing.offsetWidth - 130;
    const carMove = <HTMLElement>carBlock.querySelector(".car-move");
    const { velocity, distance } = this.engineData;
    let currentX = carMove.offsetLeft;
    const duration = Math.round(distance / velocity);
    const framesCount = (duration / 1000) * 60;
    const dX = (endX - currentX) / framesCount;
    const step = () => {
      currentX += dX;
      carMove.style.transform = `translateX(${currentX}px)`;
      if (currentX < endX) {
        this.globalAnimateId = requestAnimationFrame(step);
      }
    };
    step();
  }

  public stopAnimation() {
    cancelAnimationFrame(this.globalAnimateId);
  }
}
export default AnimationCar;

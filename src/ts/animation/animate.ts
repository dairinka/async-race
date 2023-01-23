import { EngineData } from "../type";
import AnimationCar from "./animateCar";

let globalAnimateId: number;

export function animationCar(carId: string, engineData: EngineData): void {
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const blockRacing = <HTMLElement>carBlock.querySelector(".racing-block");
  console.log("blockRacing.offsetWidth", blockRacing.offsetWidth);
  const endX = blockRacing.offsetWidth - 130;
  const carMove = <HTMLElement>carBlock.querySelector(".car-move");
  const { velocity, distance } = engineData;
  let currentX = carMove.offsetLeft;
  const duration = Math.round(distance / velocity);
  const framesCount = (duration / 1000) * 60;
  const dX = (endX - currentX) / framesCount;
  const step = () => {
    currentX += dX;
    carMove.style.transform = `translateX(${currentX}px)`;
    if (currentX < endX) {
      globalAnimateId = requestAnimationFrame(step);
    }
  };
  step();
}

export function stopAnimation() {
  cancelAnimationFrame(globalAnimateId);
}

export function stopCar(animationCar: AnimationCar, carId: string): void {
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const startBtn = <HTMLElement>carBlock.querySelector(`[data-btn="start"]`);
  console.log("stoooop");
  animationCar.stopAnimation();
  startBtn.removeAttribute("data-start");
}
export function toStart(carId: string) {
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const car = <HTMLElement>carBlock.querySelector(".car-move");
  car.classList.remove("fire");
  car.style.removeProperty("transform");
}
export function fireCar(carId: string): void {
  const carMove = <HTMLElement>(
    document.querySelector(`[data-id="${carId}"] .car-move`)
  );
  carMove.classList.add("fire");
}

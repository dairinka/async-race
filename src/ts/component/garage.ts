import Car from "./car";
class Garage {
  cars: Car[];
  count: number;
  constructor(cars: Car[]) {
    this.cars = cars;
    this.count = 0;
    this.cars.forEach(({ id, name, color }) => new Car(id, name, color));
  }
  private getCount(): number {
    return (this.count += 1);
  }
  public removeCar(currentId: string): void {
    const index: number = this.cars.findIndex(
      ({ id }) => id === Number(currentId)
    );
    this.cars.splice(index, 1);
  }
  public addCar(id: string, name = "", color = "white", speed: string): void {
    const currentId: number = this.getCount();
    //const currentSpeed = Number(speed);
    const newCar = new Car(currentId, name, color);
    this.cars.push(newCar);
  }
  // public generateCars() {
  // }
}
export default Garage;

class Car {
  id: number;
  name: string;
  color: string;
  //speed: number;
  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    //this.speed = speed;
  }
  public changeColor(color: string): void {
    this.color = color;
  }

  public updateCar(name = "", color = "white"): void {
    this.name = name;
    this.color = color;
  }
}
export default Car;

export function saveParam(paramName: string, newData: string | number): void {
  const data = JSON.stringify(newData);
  localStorage.setItem(paramName, data);
}

export function getParam(paramName: string): string {
  const data = JSON.parse(localStorage.getItem(paramName) || "");
  return data;
}

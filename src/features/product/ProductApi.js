export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8081/products");
    const data = await response.json();
    resolve({ data });
  });
}

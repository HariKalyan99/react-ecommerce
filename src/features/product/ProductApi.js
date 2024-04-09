export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8081/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    if (key === "_sort" && sort[key] === "rating") {
      queryString += `${key}=-${sort[key]}&`;
    } else if (key === "_sort" && sort[key] === "priceLow") {
      queryString += `${key}=price&`;
    } else if (key === "_sort" && sort[key] === "priceHigh") {
      queryString += `${key}=-price&`;
    }
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8081/products?` + queryString
    );
    const data = await response.json();
    // const totalItems = response.headers["X-Total-Count"];

    resolve({ data: { products: data, totalItems: 100 } });
  });
}

export function Filters({ PRODUCTS, byCategory, bySearch }) {
  let filteredProducts;

  if (!byCategory) {
    if (bySearch) {
      return PRODUCTS.filter((product) => {
        return product.productKeywords
          .toLowerCase()
          .includes(bySearch.toLowerCase());
      }).length > 0
        ? (filteredProducts = PRODUCTS.filter((product) =>
            product.productKeywords
              .toLowerCase()
              .includes(bySearch.toLowerCase())
          ))
        : (filteredProducts = PRODUCTS);
    } else {
      return (filteredProducts = PRODUCTS);
    }
  }

  return byCategory === "all"
    ? (filteredProducts = PRODUCTS)
    : (filteredProducts = PRODUCTS.filter(
        (product) => product.category === byCategory
      ));
}

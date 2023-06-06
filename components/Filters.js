export function Filters({ PRODUCTS, byCategory, bySearch }) {
  let filteredProducts;

  const hasIncluded =
    bySearch &&
    PRODUCTS.some((product) => {
      return (
        product.productKeywords +
        product.productName +
        product.productDescription
      )
        .toLowerCase()
        .includes(bySearch.toLowerCase());
    });

  if (!byCategory) {
    if (bySearch) {
      return hasIncluded
        ? (filteredProducts = PRODUCTS.filter((product) =>
            (
              product.productKeywords +
              product.productName +
              product.productDescription
            )
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

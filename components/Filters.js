/**
 * Filtra los productos según la categoría y la búsqueda especificada.
 * @param {Object[]} props - Propiedades del componente.
 * @param {Object[]} props.PRODUCTS - Lista de productos.
 * @param {string} props.byCategory - Categoría por la cual filtrar los productos.
 * @param {string} props.bySearch - Término de búsqueda para filtrar los productos.
 * @returns {Object[]} - Lista de productos filtrados.
 */
export function Filters({ PRODUCTS, byCategory, bySearch }) {
  let filteredProducts;

  // Comprobar si hay algún producto que coincida con la búsqueda
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
    // Si no hay una categoría seleccionada
    if (bySearch) {
      // Si hay un término de búsqueda
      if (hasIncluded) {
        // Filtrar los productos según el término de búsqueda
        filteredProducts = PRODUCTS.filter((product) =>
          (
            product.productKeywords +
            product.productName +
            product.productDescription
          )
            .toLowerCase()
            .includes(bySearch.toLowerCase())
        );
      } else {
        // Si no hay productos que coincidan con la búsqueda, se devuelve la lista de productos completa
        filteredProducts = PRODUCTS;
      }
    } else {
      // Si no hay un término de búsqueda, se devuelve la lista de productos completa
      filteredProducts = PRODUCTS;
    }
  } else {
    // Si hay una categoría seleccionada
    if (byCategory === "all") {
      // Si la categoría seleccionada es "all", se devuelve la lista de productos completa
      filteredProducts = PRODUCTS;
    } else {
      // Filtrar los productos según la categoría seleccionada
      filteredProducts = PRODUCTS.filter(
        (product) => product.category === byCategory
      );
    }
  }

  // Devolver la lista de productos filtrados
  return filteredProducts;
}

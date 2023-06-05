import ARSENAL_FC from "./arsenal_fc.js";
import BARCELONA from "./barcelona.js";
import LIVERPOOL_FC from "./liverpool.js";
import MANCHESTER_UNITED from "./manchester-united.js";
import REAL_MADRID from "./real-madrid.js";

const PRODUCTS = [
  ...BARCELONA,
  ...REAL_MADRID,
  ...MANCHESTER_UNITED,
  ...ARSENAL_FC,
  ...LIVERPOOL_FC,
];

export default PRODUCTS;

console.log(PRODUCTS.length);

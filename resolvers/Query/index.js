import clientQuery from "./Client.js";
import addressQuery from "./Address.js";

const Query = {
    ...clientQuery,
    ...addressQuery,
}

export default Query;
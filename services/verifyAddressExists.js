import conn from "../database/config/conn.js";

export async function VerifyAddressExistsById(id) {
    const verifyIdExists = await conn('address_clients').select('id').where({ id }).first();
    if(verifyIdExists.id){
        return true;
    }

    return false;
}
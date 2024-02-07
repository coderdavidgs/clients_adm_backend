import conn from "../database/config/conn.js";

export async function VerifyUserExistsById(id) {
    const response = await conn('clients').where({ id }).first();

    return response ? true : false;
}

export async function VerifyUserExistsByEmail(email) {
    const response = await conn('clients').where({ email }).first();
}
import conn from '../../database/config/conn.js';

const addressQuery = {
    async addresses() {
        return await conn('address_clients').select(
            'id',
            'neighborhood',
            'street',
            'number',
            'city',
            'uf',
            'client_id as clientId'
        );
    },
};

export default addressQuery;
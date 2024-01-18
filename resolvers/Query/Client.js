import conn from '../../database/config/conn.js';

const clientQuery = {
    async clients() {
        return await conn('clients').select(
            'id',
            'name',
            'last_name as lastName',
            'email',
            'job',
            'active',
            'phone_number as phoneNumber'
        );
    },
};

export default clientQuery;
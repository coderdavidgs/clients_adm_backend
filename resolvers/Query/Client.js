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

    async client(_, { input }) {
        const { id } = input;
        const verifyIdExists = await conn('clients').where({ id }).first();

        if(verifyIdExists) {
            return await conn('clients').select(
                'id',
                'name',
                'last_name as lastName',
                'phone_number as phoneNumber',
                'email',
                'job',
                'active'
            ).where({ id }).first();
        }

        return undefined;
    },
};

export default clientQuery;
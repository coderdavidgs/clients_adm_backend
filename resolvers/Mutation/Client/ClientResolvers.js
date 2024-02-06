import conn from '../../../database/config/conn.js';

const clientResolvers = {
    async registerClient(_, { input }) {
        const { email } = input;

        const verifyEmailExists = await conn('clients').where({ email }).first();

        if(!verifyEmailExists) {
            const data = {
                name: input.name,
                last_name: input.lastName,
                email: input.email,
                job: input.job,
                phone_number: input.phoneNumber,
            }

            const [ id, active ] = await conn('clients').insert(data);

            if(id) return {...input, id};

            return undefined;
        }

        return undefined;
    },

    async updateClient(_, { input }) {
        const { id, job, phoneNumber } = input;
        const verifyIdExists = await conn('clients').where({ id }).first();

        if(verifyIdExists) {
            const data = {}
            if(job) data.job = job;
            if(phoneNumber) data.phone_number = phoneNumber;

            await conn('clients').update(data).where({ id });
            
            const response = await conn('clients').select(
                'id',
                'name',
                'last_name as lastName',
                'phone_number as phoneNumber',
                'email',
                'job',
                'active'
            ).where({ id }).first();

            return id ? { ...response } : undefined;
        }

        return undefined;
    },
};

export default clientResolvers;
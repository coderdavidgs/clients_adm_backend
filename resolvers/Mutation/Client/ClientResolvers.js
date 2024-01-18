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
};

export default clientResolvers;
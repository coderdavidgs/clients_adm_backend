import conn from '../../../database/config/conn.js';
import { VerifyUserExistsByEmail, VerifyUserExistsById } from '../../../services/verifyUserExists.js';

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

            const [ id ] = await conn('clients').insert(data);

            if(id) return {...input, id};

            return undefined;
        }

        return undefined;
    },

    async updateClient(_, { input }) {
        const { id, job, phoneNumber } = input;
        const verifyIdExists = VerifyUserExistsById(id);

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

    async deleteClient(_, { input }) {
        const { id, email } = input;

        const verifyIdExists = VerifyUserExistsById(id);
        if(verifyIdExists){
            const user = await conn('clients').select(
                'id',
                'name',
                'last_name as lastName',
            ).where({ id });

            const res = await conn('clients').delete().where({ id });
            return res ? { ...user[0], message: 'Success on delete user' } : undefined;
        }
/* id 4 para testar a exclusão até o 8 */
        const verifyEmailExists = VerifyUserExistsByEmail(email);
        if(verifyEmailExists) {
            const user = await conn('clients').select(
                'id',
                'name',
                'last_name as lastName',
            ).where({ email });

            const res = await conn('clients').delete().where({ email });
            return res ? { ...user, message: 'Success on delete user' } : undefined;
        }
    },
};

export default clientResolvers;
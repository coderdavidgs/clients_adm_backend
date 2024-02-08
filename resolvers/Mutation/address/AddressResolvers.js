import conn from '../../../database/config/conn.js';
import { VerifyUserExistsById } from '../../../services/verifyUserExists.js';

const addressResolvers = {
    async registerAddress(_, { input }) {
        const clientIdExists = VerifyUserExistsById(input.clientId);

        if(clientIdExists){
            const data = {
                neighborhood: input.neighborhood, 
                street: input.street, 
                number: input.number, 
                city: input.city, 
                uf: input.uf, 
                client_id: input.clientId,
            };

            const [ id ] = await conn('address_clients').insert(data);

            return id ? {id, ...input}: undefined;
        }

        return undefined;
    },
};

export default addressResolvers;
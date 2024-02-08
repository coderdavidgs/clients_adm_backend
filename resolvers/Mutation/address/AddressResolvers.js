import conn from '../../../database/config/conn.js';
import { VerifyUserExistsById } from '../../../services/verifyUserExists.js';
import { VerifyAddressExistsById } from '../../../services/verifyAddressExists.js';

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

    async updateAddress(_, { input }) {
        const idAddressExists = await VerifyAddressExistsById(input.id);
        
        if(idAddressExists){
            const currentAddressData = await conn('address_clients').select('street',
                'number',
                'neighborhood',
                'city',
                'uf'
            ).where({ id: input.id }).first();

            const newDataAddress = {
                street: input.street || currentAddressData.street,
                number: input.number || currentAddressData.number,
                neighborhood: input.neighborhood || currentAddressData.neighborhood,
                city: input.city || currentAddressData.city,
                uf: input.uf || currentAddressData.uf,
            };

            await conn('address_clients').update(newDataAddress).where({ id: input.id });

            return await conn('address_clients').select(
                'id',
                'neighborhood',
                'street',
                'number',
                'city',
                'uf',
                'client_id as clientId'
            ).where({ id: input.id }).first();
        }

        return undefined;
    },
};

export default addressResolvers;
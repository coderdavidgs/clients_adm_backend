export const resolvers = {
    Query: {
        clients: () => {
            return [{
                name: 'David',
                lastName: 'Santos',
                email: 'david@santos.com',
                job: 'dev',
                phoneNumber: '11953782082',
                active: true,
            }]
        },
    },
};
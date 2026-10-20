type UserType = {
    id: number,
    name: string,
    email: string
}


export { };

declare global {
    namespace Express {
        interface Request {
            user?: UserType;
        }
    }
}
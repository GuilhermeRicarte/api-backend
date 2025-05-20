export const hashPassword = async (password: string): Promise<string> => {
    // Implementa a logica de hash da senha aqui
    return `hashed-${password}`;
};

export const generateToken = (userId: string): string => {
    // Implementa a logica de geração de token aqui
    return `token-for-${userId}`;
};
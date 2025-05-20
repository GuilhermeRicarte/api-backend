type User = {
    id: number;
    username: string;
    password: string;
    genero: string;
    cpf: string;
    telefone: string;
    cep: string;
    rua: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    fotoPerfil: string;
};

const users: User[] = [];

class UserModel {
    static updatePassword(username: string, newHashedPassword: string) {
        throw new Error('Method not implemented.');
    }
    static async findByUsername(username: string): Promise<User | null> {
        return users.find(user => user.username === username) || null;
    }

    static async create(user: Omit<User, 'id'>): Promise<User> {
        const newUser = { id: users.length + 1, ...user };
        users.push(newUser);
        return newUser;
    }

    static async updateFotoPerfil(username: string, fotoPerfil: string): Promise<User | null> {
        const user = users.find(u => u.username === username);
        if (user) {
            user.fotoPerfil = fotoPerfil;
            return user;
        }
        return null;
    }
}

export default UserModel;
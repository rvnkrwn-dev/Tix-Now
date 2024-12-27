import { prisma } from '~/server/config/db';
import { User } from '~/server/model/User';
import { RegisterRequest, UpdateUserRequest } from '~/types/AuthType';
import { Role } from '~/types/TypesModel';

describe('User Model', () => {
    beforeAll(async () => {
        // Setup the database before running tests
        await prisma.$connect();
    });

    afterAll(async () => {
        // Clean up the database after running tests
        await prisma.user.deleteMany({});
        await prisma.$disconnect();
    });

    it('should create a new user', async () => {
        const newUser: RegisterRequest = {
            full_name: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        const createdUser = await User.createUser(newUser);
        expect(createdUser).toHaveProperty('id');
        expect(createdUser.email).toBe(newUser.email);
    });

    it('should update an existing user', async () => {
        const user = await prisma.user.create({
            data: {
                full_name: 'User to Update',
                username: 'updateme',
                email: 'update@example.com',
                password: 'password123',
                role: Role.USER // Gunakan enum Role
            }
        });

        const updateUser: UpdateUserRequest = {
            user_id: 0,
            full_name: 'Updated User',
            username: 'updateduser',
            email: 'updated@example.com',
            password: 'newpassword123',
            role: Role.USER
        };

        const updatedUser = await User.updateUser(user.id, updateUser);
        expect(updatedUser.full_name).toBe(updateUser.full_name);
        expect(updatedUser.email).toBe(updateUser.email);
    });

    it('should get a user by email', async () => {
        const email = 'getbyemail@example.com';
        await prisma.user.create({
            data: {
                full_name: 'Get By Email',
                username: 'getbyemail',
                email: email,
                password: 'password123',
                role: Role.USER // Gunakan enum Role
            }
        });

        const user = await User.getUserByEmail(email);
        expect(user).toHaveProperty('email', email);
    });

    it('should get a user by id', async () => {
        const createdUser = await prisma.user.create({
            data: {
                full_name: 'Get By ID',
                username: 'getbyid',
                email: 'getbyid@example.com',
                password: 'password123',
                role: Role.USER // Gunakan enum Role
            }
        });

        const user = await User.getUserById(createdUser.id);
        expect(user).toHaveProperty('id', createdUser.id);
    });

    it('should get all users with pagination', async () => {
        await prisma.user.createMany({
            data: [
                { full_name: 'User One', username: 'userone', email: 'userone@example.com', password: 'password123', role: Role.USER },
                { full_name: 'User Two', username: 'usertwo', email: 'usertwo@example.com', password: 'password123', role: Role.USER },
                { full_name: 'User Three', username: 'userthree', email: 'userthree@example.com', password: 'password123', role: Role.USER },
            ]
        });

        const users = await User.getAllUsers(1, 2);
        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBe(2);
    });

    it('should count all users', async () => {
        const count = await User.countAllUsers();
        expect(count).toBeGreaterThan(0);
    });

    it('should delete a user', async () => {
        const user = await prisma.user.create({
            data: {
                full_name: 'User to Delete',
                username: 'deleteme',
                email: 'delete@example.com',
                password: 'password123',
                role: Role.USER // Gunakan enum Role
            }
        });

        await User.deleteUser(user.id);
        const deletedUser = await prisma.user.findUnique({
            where: { id: user.id }
        });
        expect(deletedUser).toBeNull();
    });

    it('should search users', async () => {
        const search = 'searchuser';
        await prisma.user.createMany({
            data: [
                { full_name: 'Search User One', username: 'searchone', email: 'searchone@example.com', password: 'password123', role: Role.USER },
                { full_name: 'Search User Two', username: 'searchtwo', email: 'searchtwo@example.com', password: 'password123', role: Role.USER }
            ]
        });

        const users = await User.searchUser(search);
        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBeGreaterThan(0);
    });
});

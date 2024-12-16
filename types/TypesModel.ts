// User Type
import type {Category, DetailTransaction, Log, RefreshToken, Ticket, Transaction} from "@prisma/client";

export interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    Transactions: Transaction[];
    RefreshTokens: RefreshToken[];
    Logs: Log[];
}

export enum Role {
    USER = 'User',
    ADMIN = 'Admin',
}

// Ticket Type
export interface TicketType {
    id: number;
    slug: string;
    title: string;
    description: string;
    location: string;
    dateTime: Date;
    stock: number;
    price: number;
    categoryId: number;
    imageUrl: string;
    secureUrl: string;
    publicId: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

// Category Type
export interface CategoryType {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

// Transaction Type
export interface TransactionType {
    id: number;
    userId: number;
    totalTicket: number;
    total: number;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    details: DetailTransaction;
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

// Detail Transaction Type
export interface DetailTransactionType {
    id: number;
    transactionId: number;
    ticketId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    transaction: Transaction;
    ticket: Ticket;
}

// Refresh Token Type
export interface RefreshTokenType {
    id: number;
    user_id: number;
    user: User;
    refresh_token: string;
    created_at: Date;
    updated_at: Date;
}

// Log Type
export interface LogType {
    id: number;
    user_id: number;
    user: User;
    action: string;
    description: string;
    created_at: Date;
}

export enum ActionLog {
    LOGOUT = 'LOGOUT',
    LOGIN = 'LOGIN',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

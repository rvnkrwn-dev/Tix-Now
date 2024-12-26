import {ActionLog, Role, TransactionStatus} from "~/types/TypesModel"
import type {User} from "@prisma/client";

// Create User Request Interface
export interface RegisterRequest {
    full_name: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    code: number,
    message: string,
    data: {
        user: User,
    },
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    code: number,
    message: string,
    access_token: string,
    data: {
        user: User,
    },
}

// Update User Request Interface
export interface UpdateUserRequest {
    full_name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: Role;
    user_id: number;
}

// Log Request Interface
export interface LogRequest {
    user_id: number;
    action: ActionLog;
    description: string;
}

// Ticket Request Interface
export interface TicketRequest {
    slug: string;
    title: string;
    description: string;
    location: string;
    dateTime: Date;
    stock: number;
    price: number;
    categories_id: number;
    url_ticket: string;
    secure_url_ticket: string;
    public_id_ticket: string;
}

// Category Request Interface
export interface CategoryRequest {
    name: string;
    description: string;
}

// Transaction Request Interface
export interface TransactionRequest {
    user_id: number;
    total_ticket: number;
    total: number;
    imageUrl?: string;
    secureUrl?: string;
    publicId?: string
}

export interface TransactionUpdateStatus {
    user_id: number;
    status: TransactionStatus;
    imageUrl: string;
    secureUrl: string;
    publicId: string;
}

// Detail Transaction Request Interface
export interface DetailTransactionRequest {
    transaction_id: number;
    ticket_id: number;
    quantity: number;
}

// Refresh Token Request Interface
export interface RefreshTokenRequest {
    user_id: number;
    refresh_token: string;
}

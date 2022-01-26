import { Cart } from "./Cart";

export interface CheckoutInfo {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    cart: Array<Cart>
}
// src/atoms/authState.ts
import { atom } from "recoil";

export interface LoginState {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export interface SignupState {
  email: string;
  password: string;
  username: string;
}

// Atom for managing login state
export const loginState = atom<LoginState>({
  key: "loginState",
  default: {
    email: "",
    password: "",
    isLoggedIn: false,
  },
});

// Atom for managing signup state
export const signupState = atom<SignupState>({
  key: "signupState",
  default: {
    email: "",
    password: "",
    username: "",
  },
});

import axios from "axios";
import { BACKEND_URL } from "./config";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const Signupauth = async (data: SignupData): Promise<any> => {
  const url = `${BACKEND_URL}/api/v1/user/signup`;
  try {
    const response = await axios.post(url, data);
    if (response.data.success) {
      return response.data;
    } else {
      return {
        error: true,
        message: response.data.message || "An error occurred during signup",
      };
    }
  } catch (error) {
    return {
      error: true,
      // @ts-ignore
      message: error?.response?.data?.message || "Internal server error",
    };
  }
};

interface loginData {
  email: string;
  password: string;
}

export const Loginauth = async (data: loginData): Promise<any> => {
  const url = `${BACKEND_URL}/api/v1/user/login`;
  try {
    const response = await axios.post(url, data);
    if (response.data.success) {
      return response.data;
    } else {
      return {
        error: true,
        message: response.data.message || "Invalid credentials",
      };
    }
  } catch (error) {
    return {
      error: true,
      // @ts-ignore
      message: error?.response?.data?.message || "Internal server error",
    };
  }
};

export const Logoutauth = async (): Promise<any> => {
  const url = `${BACKEND_URL}/api/v1/user/logout`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      url,
      {},
      {
        // Passing empty body since logout doesn't need one
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return response.data;
    } else {
      return {
        error: true,
        message: response.data.message || "An error occurred during logout",
      };
    }
  } catch (error: any) {
    return {
      error: true,
      message: error?.response?.data?.message || "Internal server error",
    };
  }
};

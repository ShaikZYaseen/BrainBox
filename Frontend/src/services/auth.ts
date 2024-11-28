import axios from 'axios';

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const Signupauth = async (data: SignupData): Promise<any> => {
  const url = "http://localhost:3000/api/v1/user/signup";
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

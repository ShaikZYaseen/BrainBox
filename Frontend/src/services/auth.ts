import axios from 'axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const Signupauth = async (data: SignupData): Promise<any> => {
  const url = "http://localhost:8080/api/v1/user/signup";
  console.log(data)
  try {
    const response = await axios.post(url, data,{ withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

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
    return response;
  } catch (error) {
    return {error:true, message:"Internal server error"}
  }
};

interface loginData{
  email:string,
  password:string
}

export const Loginauth = async (data:loginData): Promise<any> => {
  const url = "http://localhost:3000/api/v1/user/login";
  try {
    const response = await axios.post(url,data);
    return response.data;
  } catch (error) {
    return {error:true, message:"Internal server error"};
  }
};

export const Logoutauth = async (): Promise<any> => {
  const url = "http://localhost:3000/api/v1/user/logout";
try {
  
} catch (error) {
  return {error:true, message:"Internal server error"};

}
};
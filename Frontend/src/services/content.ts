import axios from "axios";

interface contentType {
  title: string;
  link: string;
  selectedType: string;
}

export const addContent = async (data: contentType): Promise<any> => {
  const token = localStorage.getItem("token");

  const url = "http://localhost:3000/api/v1/content/add-content";
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
      message: error?.response?.data?.message || "Internal server error",
    };
  }
};
export const getContent = async (data: string): Promise<any> => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:3000/api/v1/content/get-content?search=${data}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      return {
        error: true,
        message: response.data.message || "Failed to get Content",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || "Internal server error",
    };
  }
};

export const deleteContent = async (id: string): Promise<any> => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:3000/api/v1/content/delete-content/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      return {
        error: true,
        message: response.data.message || "Failed to get Content",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || "Internal server error",
    };
  }
};

import axios from "axios";

const uploadCsv = async (csvData) => {
  try {
    const response = await axios.post(
      "https://localhost:51388/api/Campaign/upload",
      csvData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV data:", error);
    throw error;
  }
};

export default uploadCsv;

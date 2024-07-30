import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

const CsvUploader = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!csvFile) {
      setMessage("Please upload a CSV file.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        try {
          const csvArray = result.data;
          console.log("Parsed CSV Data:", csvArray); // Debugging step

          // Send data to the backend
          const response = await axios.post(
            "https://localhost:51388/api/Campaign/upload",
            csvArray,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("API Response:", response.data); // Debugging step
          setMessage(response.data.message);
        } catch (error) {
          console.error("Error uploading CSV data:", error);
          setMessage("Error uploading CSV data.");
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        setMessage("Error parsing CSV file.");
      },
    });
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CsvUploader;

// [Route("upload")]
// public async Task<IActionResult> UploadCsvAsync([FromBody] List<CampaignItem> data)
// {
//     if (data == null || !data.Any())
//     {
//         return BadRequest("No file uploaded.");
//     }

//     _logger.LogInformation("starting to read the file");
//     var csvData = new List<CampaignItem>();

//     try
//     {

//         _logger.LogInformation($"csv data: {csvData}");
//         foreach (var item in data)
//         {
//             _context.CampaignItems.Add(item);

//         }
//         await _context.SaveChangesAsync();

//         return Ok(new { message = "CSV data successfully uploaded!" });
//     }
//     catch (CsvHelperException csvEx)
//     {
//         _logger.LogError(csvEx, "Error occurred while parsing the CSV file.");
//         return BadRequest("Error occurred while parsing the CSV file.");
//     }

// }

import { extractAuthHeaders } from "@/helpers/extractAuthHeaders.ts";
import { writeTextToFile, writeJsonToFile } from "@/utils/fileUtils.ts";

// Process the HAR file and extract necessary data
export async function processHarFile(filePath: string, outputType: 'text' | 'json') {
  try {
    // Read and parse the HAR file
    const harData = await Deno.readTextFile(filePath);
    const parsedHar = JSON.parse(harData);
    const output: any[] = [];

    // Helper function to safely parse JSON, returning raw string if parsing fails
    const safeParseJson = (data: string) => {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    };

    // Process each entry in the HAR log
    for (const entry of parsedHar.log.entries) {
      const { request, response } = entry;

      // Extract necessary request and response details
      const url = request.url;
      const method = request.method;
      const queryParams = request.queryString || [];
      const postData = request.postData?.text ? safeParseJson(request.postData.text) : null;
      const responseBody = response.content?.text ? safeParseJson(response.content.text) : '';
      const responseStatus = response.status;

      // Extract authentication headers
      const requestAuthHeaders = extractAuthHeaders(request.headers);
      const responseAuthHeaders = extractAuthHeaders(response.headers);

      // Collect the output data
      output.push({
        url,
        method,
        queryParams,
        postData,
        responseStatus,
        responseBody,
        requestAuthHeaders,
        responseAuthHeaders,
      });
    }

    // Write the output based on the user's selection
    const outputFile = outputType === 'json' ? 'output.json' : 'output.txt';

    if (outputType === 'json') {
      // Write as a JSON file
      await writeJsonToFile(outputFile, output);
    } else {
      // Write as a plain text file
      const textData = output.map((o) => `
        Request URL: ${o.url}
        Method: ${o.method}
        Query Params: ${JSON.stringify(o.queryParams)}
        Post Data: ${o.postData}
        Response Status: ${o.responseStatus}
        Response Body: ${o.responseBody}
        Request Auth Headers: ${JSON.stringify(o.requestAuthHeaders)}
        Response Auth Headers: ${JSON.stringify(o.responseAuthHeaders)}
      `).join("\n");
      
      await writeTextToFile(outputFile, textData);
    }

  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.error("❌ File not found: Please check the file path.");
    } else {
      console.error("❌ Error processing the HAR file:", error);
    }
  }
}

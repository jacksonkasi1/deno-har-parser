// Import the helper function
import { extractAuthHeaders } from '@/helpers/extractAuthHeaders.ts';

// Function to process the HAR file and extract necessary data
export async function processHarFile(filePath: string) {
  try {
    // Read and parse the HAR file
    const harData = await Deno.readTextFile(filePath);
    const parsedHar = JSON.parse(harData);

    // Process each entry in the HAR file
    parsedHar.log.entries.forEach((entry: any) => {
      const { request, response } = entry;

      // Extract URL, method, payload, and response details
      const url = request.url;
      const method = request.method;
      const queryParams = request.queryString;
      const postData = request.postData?.text || null;
      const responseBody = response.content?.text || '';
      const responseStatus = response.status;

      // Extract authentication headers
      const requestAuthHeaders = extractAuthHeaders(request.headers);
      const responseAuthHeaders = extractAuthHeaders(response.headers);

      // Display the extracted information
      console.log(`
        Request URL: ${url}
        Method: ${method}
        Query Params: ${JSON.stringify(queryParams)}
        Post Data: ${postData}
        Response Status: ${responseStatus}
        Response Body: ${responseBody}
        Request Auth Headers: ${JSON.stringify(requestAuthHeaders)}
        Response Auth Headers: ${JSON.stringify(responseAuthHeaders)}
      `);
    });

  } catch (error: unknown) {
    if (error instanceof Deno.errors.NotFound) {
      console.error("❌ File not found: Please check the file path and try again.");
    } else {
      console.error("❌ Error reading or processing the HAR file:", error);
    }
  }
}

// Run the function with the provided HAR file path
const filePath = './network.har';  // Update with the correct file path
await processHarFile(filePath);

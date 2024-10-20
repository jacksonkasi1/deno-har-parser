import { extractAuthHeaders } from "@/helpers/extractAuthHeaders.ts";
import { writeTextToFile, writeJsonToFile } from "@/utils/fileUtils.ts";

// Function to process the HAR file and extract necessary data
export async function processHarFile(
  filePath: string,
  outputType: "text" | "json",
) {
  try {
    // Read and parse the HAR file
    const harData = await Deno.readTextFile(filePath);
    const parsedHar = JSON.parse(harData);
    const output: any[] = [];

    // Process each entry in the HAR file
    parsedHar.log.entries.forEach((entry: any) => {
      const { request, response } = entry;

      // Extract URL, method, payload, and response details
      const url = request.url;
      const method = request.method;
      const queryParams = request.queryString;
      const postData = request.postData?.text || null;
      const responseBody = response.content?.text || "";
      const responseStatus = response.status;

      // Extract authentication headers
      const requestAuthHeaders = extractAuthHeaders(request.headers);
      const responseAuthHeaders = extractAuthHeaders(response.headers);

      // Store output data
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
    });

    // Choose how to save the output based on user's selection
    const outputFile = outputType === "json" ? "output.json" : "output.txt";
    if (outputType === "json") {
      await writeJsonToFile(outputFile, output);
    } else {
      const textData = output
        .map(
          (o) => `
        Request URL: ${o.url}
        Method: ${o.method}
        Query Params: ${JSON.stringify(o.queryParams)}
        Post Data: ${o.postData}
        Response Status: ${o.responseStatus}
        Response Body: ${o.responseBody}
        Request Auth Headers: ${JSON.stringify(o.requestAuthHeaders)}
        Response Auth Headers: ${JSON.stringify(o.responseAuthHeaders)}
      `,
        )
        .join("\n");
      await writeTextToFile(outputFile, textData);
    }
  } catch (error: unknown) {
    if (error instanceof Deno.errors.NotFound) {
      console.error(
        "❌ File not found: Please check the file path and try again.",
      );
    } else {
      console.error("❌ Error reading or processing the HAR file:", error);
    }
  }
}

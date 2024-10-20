import { processHarFile } from "./src/processHarFile.ts";

// Prompt user for output type (text or json)
const outputType =
  prompt("Choose output format: (json/text)", "json")?.toLowerCase() || "json";

// Run the process with the selected output type
const filePath = "./network.har"; // HAR file path
await processHarFile(filePath, outputType as "json" | "text");

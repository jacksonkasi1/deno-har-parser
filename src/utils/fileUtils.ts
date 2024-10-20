// Helper to write data to a text file
export async function writeTextToFile(filePath: string, data: string) {
  try {
    await Deno.writeTextFile(filePath, data);
    console.log(`✅ Output successfully saved to ${filePath}`);
  } catch (error) {
    console.error("❌ Error writing to text file:", error);
  }
}

// Helper to write data to a JSON file
export async function writeJsonToFile(filePath: string, data: object) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await Deno.writeTextFile(filePath, jsonData);
    console.log(`✅ Output successfully saved to ${filePath}`);
  } catch (error) {
    console.error("❌ Error writing to JSON file:", error);
  }
}

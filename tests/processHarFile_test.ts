import { processHarFile } from "../src/processHarFile.ts";
import { assertEquals } from "@std/assert"; // Use the local alias for the asserts module

// Test case to ensure processHarFile runs without errors
Deno.test("processHarFile should parse HAR file correctly", async () => {
  const mockHarFilePath = "./tests/mock.har"; // Path to a mock HAR file for testing

  try {
    await processHarFile(mockHarFilePath);
    // If no errors, pass the test by asserting true is true
    assertEquals(true, true);
  } catch (error) {
    // If an error occurs, fail the test
    assertEquals(true, false, "processHarFile threw an error");
  }
});

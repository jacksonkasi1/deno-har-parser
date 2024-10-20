// Helper function to extract authentication-related headers
export function extractAuthHeaders(headers: any[]): { [key: string]: string } {
    const authHeaders: { [key: string]: string } = {};
    const authPattern = /authorization|cookie|token|key/i;
    
    for (const header of headers) {
      if (authPattern.test(header.name)) {
        authHeaders[header.name] = header.value;
      }
    }
    return authHeaders;
  }
  
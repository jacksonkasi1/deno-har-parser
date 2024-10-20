
# Deno HAR Parser

This project provides a simple Deno TypeScript script to extract specific data from a `.har` (HTTP Archive) file. It parses network requests and responses and extracts the URL, method, payload (query params, body), response data, and specific headers (like `Authorization`, `Cookie`, `token`, or `key`).

## Features

- Extracts the following from HAR files:
  - Request URL
  - HTTP method
  - Query parameters and POST data (payload)
  - Response status and body
  - Specific headers (Authentication, Cookies, Tokens, etc.)
- Supports regex filtering for authentication-related headers.

## Project Structure

```
deno-har-parser/
│
├── src/
│   ├── helpers/
│   │   └── extractAuthHeaders.ts    # Helper function to extract authentication-related headers
│   └── processHarFile.ts            # Main logic for processing HAR file
│
├── tests/
│   └── processHarFile_test.ts       # Unit tests for the processHarFile function
│
├── .gitignore                       # Git ignore file for the project
├── deno.json                        # Deno configuration file
├── README.md                        # Documentation for the project
└── network.har                      # Sample HAR file for testing
```

## Setup

### Prerequisites

- [Deno](https://deno.land/) (v1.28 or later)

### Clone the Repository

```bash
git clone https://github.com/your-username/deno-har-parser.git
cd deno-har-parser
```

### Running the Script

1. Place your `.har` file in the root directory, or use the provided `network.har` as a sample.
2. Run the script:

```bash
deno run --allow-read ./src/processHarFile.ts
```

The script will extract and log the URL, HTTP method, query parameters, POST data, response status, and any authentication-related headers (Authorization, Cookies, Tokens, etc.).

### Testing

To run the tests:

```bash
deno test
```

### Configuration (Optional)

The project includes a `deno.json` file for configuring Deno's settings (like import maps or compiler options).

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

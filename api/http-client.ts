type HttpRequest = {
  endpoint: string;
  headers?: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
};

export class ApiError extends Error {
  description: string;

  constructor(message: string, description: string) {
    super(message);
    this.name = "ApiError";
    this.description = description;
  }
}

class HttpClient {
  baseURL: string;

  constructor(baseURL: string | undefined) {
    if (!baseURL) {
      throw new Error("Base URL is required");
    }
    this.baseURL = baseURL;
  }

  async request({ endpoint, method, headers = {}, body }: HttpRequest) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    };

    try {
      const response = await fetch(url, options);

      clearTimeout(timeoutId);

      if (!response.ok) {
        const responseBody = await response.json();
        throw new ApiError(responseBody.error, responseBody.description);
      }

      if (response.status == 200) {
        return await response.json();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name == "AbortError") {
          console.error("Request was aborted due to error");
        }
      }

      throw error;
    }
  }
}

export const httpClient = new HttpClient("http://localhost:80");

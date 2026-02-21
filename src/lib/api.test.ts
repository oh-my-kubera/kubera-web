import { describe, it, expect, vi, beforeEach } from "vitest";
import { api, apiUpload, ApiError } from "./api";

vi.mock("./connection", () => ({
  getServerUrl: vi.fn(() => "http://localhost:8000"),
  getToken: vi.fn(() => "test-token"),
}));

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("ApiError", () => {
  it("uses detail string as message", () => {
    const err = new ApiError(400, { detail: "Bad request" });
    expect(err.message).toBe("Bad request");
    expect(err.status).toBe(400);
  });

  it("falls back to generic message", () => {
    const err = new ApiError(500, { other: "data" });
    expect(err.message).toBe("API error 500");
  });
});

describe("api", () => {
  it("makes authenticated GET request", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: "ok" }),
    });

    const result = await api("/api/v1/test");

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual({ data: "ok" });
  });

  it("throws ApiError on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ detail: "Not found" }),
    });

    await expect(api("/api/v1/missing")).rejects.toThrow(ApiError);
    await expect(
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ detail: "Not found" }),
      }) && api("/api/v1/missing")
    ).rejects.toMatchObject({ status: 404, message: "Not found" });
  });

  it("throws when no server connection", async () => {
    const { getServerUrl } = await import("./connection");
    vi.mocked(getServerUrl).mockReturnValueOnce("");

    await expect(api("/test")).rejects.toThrow("No server connection configured");
  });
});

describe("apiUpload", () => {
  it("sends FormData without Content-Type header", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ uploaded: true }),
    });

    const formData = new FormData();
    formData.append("file", new Blob(["test"]), "test.csv");

    const result = await apiUpload("/api/v1/upload", formData);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/upload",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
        body: formData,
      })
    );
    expect(result).toEqual({ uploaded: true });
  });

  it("appends query params to url", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await apiUpload("/api/v1/upload", new FormData(), { source: "bank" });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("?source=bank"),
      expect.anything()
    );
  });
});

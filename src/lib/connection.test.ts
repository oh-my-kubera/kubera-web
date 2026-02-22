import { describe, it, expect, beforeEach } from "vitest";
import {
  getConnection,
  getServerUrl,
  getToken,
  saveConnection,
  clearConnection,
  getRecentConnections,
} from "./connection";

beforeEach(() => {
  localStorage.clear();
});

describe("getConnection", () => {
  it("returns null when no connection saved", () => {
    expect(getConnection()).toBeNull();
  });

  it("returns parsed connection", () => {
    localStorage.setItem(
      "kubera-connection",
      JSON.stringify({ url: "http://localhost:8000", token: "abc" })
    );
    expect(getConnection()).toEqual({
      url: "http://localhost:8000",
      token: "abc",
    });
  });

  it("returns null for invalid JSON", () => {
    localStorage.setItem("kubera-connection", "not-json");
    expect(getConnection()).toBeNull();
  });
});

describe("getServerUrl / getToken", () => {
  it("returns empty string when no connection", () => {
    expect(getServerUrl()).toBe("");
    expect(getToken()).toBe("");
  });

  it("returns url and token from saved connection", () => {
    saveConnection({ url: "http://localhost:8000", token: "tok123" });
    expect(getServerUrl()).toBe("http://localhost:8000");
    expect(getToken()).toBe("tok123");
  });
});

describe("saveConnection / clearConnection", () => {
  it("saves and clears connection", () => {
    saveConnection({ url: "http://a.com", token: "t1" });
    expect(getConnection()).not.toBeNull();

    clearConnection();
    expect(getConnection()).toBeNull();
  });
});

describe("getRecentConnections", () => {
  it("returns empty array when no recent connections", () => {
    expect(getRecentConnections()).toEqual([]);
  });

  it("saves connections to recent list", () => {
    saveConnection({ url: "http://a.com", token: "t1" });
    saveConnection({ url: "http://b.com", token: "t2" });

    const recent = getRecentConnections();
    expect(recent).toHaveLength(2);
    expect(recent[0].url).toBe("http://b.com");
    expect(recent[1].url).toBe("http://a.com");
  });

  it("deduplicates by url and keeps max 5", () => {
    for (let i = 0; i < 7; i++) {
      saveConnection({ url: `http://s${i}.com`, token: `t${i}` });
    }
    expect(getRecentConnections()).toHaveLength(5);
  });

  it("moves existing url to front on re-save", () => {
    saveConnection({ url: "http://a.com", token: "t1" });
    saveConnection({ url: "http://b.com", token: "t2" });
    saveConnection({ url: "http://a.com", token: "t1-new" });

    const recent = getRecentConnections();
    expect(recent[0]).toEqual({ url: "http://a.com", token: "t1-new" });
    expect(recent).toHaveLength(2);
  });
});

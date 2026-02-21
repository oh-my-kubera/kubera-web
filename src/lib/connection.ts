const CONNECTION_KEY = "kubera-connection";
const RECENT_CONNECTIONS_KEY = "kubera-recent-connections";
const MAX_RECENT = 5;

export interface ServerConnection {
  url: string;
  token: string;
}

export function getServerUrl(): string {
  if (typeof window === "undefined") return "";
  const conn = getConnection();
  return conn?.url ?? "";
}

export function getToken(): string {
  if (typeof window === "undefined") return "";
  const conn = getConnection();
  return conn?.token ?? "";
}

export function getConnection(): ServerConnection | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CONNECTION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ServerConnection;
  } catch {
    return null;
  }
}

export function saveConnection(conn: ServerConnection): void {
  localStorage.setItem(CONNECTION_KEY, JSON.stringify(conn));
  addToRecent(conn);
}

export function clearConnection(): void {
  localStorage.removeItem(CONNECTION_KEY);
}

export function getRecentConnections(): ServerConnection[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(RECENT_CONNECTIONS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ServerConnection[];
  } catch {
    return [];
  }
}

function addToRecent(conn: ServerConnection): void {
  const recent = getRecentConnections().filter((c) => c.url !== conn.url);
  recent.unshift(conn);
  localStorage.setItem(
    RECENT_CONNECTIONS_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT))
  );
}

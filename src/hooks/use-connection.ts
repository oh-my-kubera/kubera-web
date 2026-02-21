import { useSyncExternalStore } from "react";
import {
  saveConnection,
  clearConnection,
  getRecentConnections,
  type ServerConnection,
} from "@/lib/connection";

const CONNECTION_KEY = "kubera-connection";
const CHANGE_EVENT = "kubera-connection-change";

function dispatchChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONNECTION_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

function getSnapshot() {
  return localStorage.getItem(CONNECTION_KEY);
}

function getServerSnapshot() {
  return null;
}

export function useConnection() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const connection = raw ? (JSON.parse(raw) as ServerConnection) : null;

  return {
    connection,
    isConnected: connection !== null,
    save(conn: ServerConnection) {
      saveConnection(conn);
      dispatchChange();
    },
    clear() {
      clearConnection();
      dispatchChange();
    },
    getRecent: getRecentConnections,
  };
}

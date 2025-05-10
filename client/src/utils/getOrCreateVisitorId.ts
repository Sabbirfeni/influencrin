// utils/visitor.ts
import { v4 as uuidv4 } from "uuid";

const VISITOR_KEY = "visitor_id";
const TIMESTAMP_KEY = "visitor_timestamp";
const EXPIRY_MS = 60_000; // 1 minute

export const getOrCreateVisitorId = () => {
  const savedId = localStorage.getItem(VISITOR_KEY);
  const savedTimestamp = localStorage.getItem(TIMESTAMP_KEY);

  const now = Date.now();

  if (
    !savedId ||
    !savedTimestamp ||
    now - parseInt(savedTimestamp, 10) > EXPIRY_MS
  ) {
    const newId = uuidv4();
    localStorage.setItem(VISITOR_KEY, newId);
    localStorage.setItem(TIMESTAMP_KEY, now.toString());
    return newId;
  }

  return savedId;
};

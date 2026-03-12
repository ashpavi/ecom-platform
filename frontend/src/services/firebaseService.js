import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

// ── READ ──────────────────────────────────────────────────────────────────────

/** Fetch all documents from a collection. */
export const getCollection = async (name) => {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ── WRITE ─────────────────────────────────────────────────────────────────────

/** Add a new document. Returns the created DocumentReference. */
export const addData = async (collectionName, data) => {
  return await addDoc(collection(db, collectionName), data);
};

/** Update an existing document by id. */
export const updateData = async (collectionName, id, data) => {
  await updateDoc(doc(db, collectionName, id), data);
};

/** Delete a document by id. */
export const deleteData = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

// ── REAL-TIME ─────────────────────────────────────────────────────────────────

/**
 * Subscribe to a collection with optional ordering and limit.
 * Returns the unsubscribe function.
 */
export const subscribeToCollection = (name, callback, options = {}) => {
  const { orderByField = "timestamp", limitTo = 50 } = options;
  const q = query(
    collection(db, name),
    orderBy(orderByField, "desc"),
    limit(limitTo)
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
};

// ── SYSTEM LOGS ───────────────────────────────────────────────────────────────

/**
 * Write an entry to the systemLogs collection.
 *
 * @param {string} action  - Human-readable description, e.g. "Admin suspended"
 * @param {string} admin   - Who performed the action, defaults to "Super Admin"
 * @param {string} type    - Log type: "create" | "settings" | "warning" | "system"
 */
export const addLog = async (action, admin = "Super Admin", type = "system") => {
  await addDoc(collection(db, "systemLogs"), {
    action,
    admin,
    type,
    time: new Date().toLocaleString(),
    timestamp: serverTimestamp(),
  });
};

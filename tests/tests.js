import mongoose from "mongoose";
import { beforeAll, afterAll, afterEach, vi } from "vitest";

// 👉 1. Connect to test DB
beforeAll(async () => {
  const uri = process.env.TEST_DB_URI || "mongodb://127.0.0.1:27017/test_test_db";

  await mongoose.connect(uri);
});

// 👉 2. Clean DB after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// 👉 3. Close DB after all tests
afterAll(async () => {
  await mongoose.connection.close();
});


// 👉 4. Mock Google Auth globally
vi.mock("../src/auth/googleAuth.js", () => ({
  verifyGoogleToken: async () => {
    return {
      userId: "test-user-id",
      email: "test@example.com",
    };
  },
}));
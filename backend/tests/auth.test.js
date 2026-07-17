import { describe, it, expect } from "vitest";
import request from "supertest";

// Points at a running dev server; for full CI isolation, spin up the app
// in-process instead of importing server.js (which calls .listen()).
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:5000";

describe("Auth API", () => {
  it("rejects login with missing credentials", async () => {
    const res = await request(BASE_URL).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("rejects login with wrong password", async () => {
    const res = await request(BASE_URL)
      .post("/api/auth/login")
      .send({ email: "admin@saleshub.dev", password: "wrong-password" });
    expect(res.status).toBe(401);
  });

  it("logs in the seeded super admin successfully", async () => {
    const res = await request(BASE_URL)
      .post("/api/auth/login")
      .send({ email: "admin@saleshub.dev", password: "Passw0rd!" });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.user.role).toBe("SUPER_ADMIN");
  });

  it("blocks unauthenticated access to admin dashboard", async () => {
    const res = await request(BASE_URL).get("/api/admin/dashboard");
    expect(res.status).toBe(401);
  });
});

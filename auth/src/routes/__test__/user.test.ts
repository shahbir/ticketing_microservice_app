import request from "supertest";
import { app } from "../../app";

describe("Sign Up Tests ", () => {
  it("returns a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });

  it("returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test.com", password: "password" })
      .expect(400);
  });

  it("returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "pas" })
      .expect(400);
  });

  it("returns a 400 with missing email and password", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(400);
  });

  it("sets a cookie after successful signup", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);

    expect(res.get("Set-Cookie")).toBeDefined();
  });
});

describe("SignIn Tests", () => {
  it("fails when a email does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  it("fails when an incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "pa",
      })
      .expect(400);
  });

  it("respond with a cookie when given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const res = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);

    expect(res.get("Set-Cookie")).toBeDefined();
  });
});

describe("SignOut Tests", () => {
  it("clears the cookie after signing out", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);

    const res = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    expect(res.get("Set-Cookie")[0]).toEqual(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});

describe("Current User Tests", () => {
  it("responds with details about the current user", async () => {
    const authResponse = await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);

    const cookie = authResponse.get("Set-Cookie");

    const res = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({})
      .expect(200);

    expect(res.body.currentUser.email).toEqual("test@test.com");
  });
});

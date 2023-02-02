import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return a 404 if the provided ID does not exists", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/ticket/${id}`)
    .send({ title: "check", price: 20 })
    .expect(404);
});

it("return a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  // without cookies authenticated
  await request(app)
    .put(`/api/ticket/${id}`)
    .send({ title: "check", price: 20 })
    .expect(401);
});

it("return a 400 if the user does not own the ticket ", async () => {
  await request(app)
    .post("/api/tickets")
    // .set('Cookie', global.signin())
    .send({ title: "check", price: 20 });
});

it("return a 400 if the  user provides an invalid title or price", async () => {});

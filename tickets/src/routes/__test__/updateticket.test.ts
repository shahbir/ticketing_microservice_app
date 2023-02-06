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

  await request(app)
    .put(`/api/ticket/${id}`)
    .set("Cookie", (<any>globalThis).sign())
    .send({ title: "check", price: 20 })
    .expect(401);
});

it("return a 400 if the user does not own the ticket ", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", (<any>globalThis).signin())
    .send({ title: "check", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", (<any>globalThis).sign())
    .send({ title: "werwer", price: 1000 })
    .expect(401);
});

it("return a 400 if the  user provides an invalid title or price", async () => {});

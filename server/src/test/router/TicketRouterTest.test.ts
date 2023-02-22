import supertest from "supertest";
import { app } from "../../start";

const request = supertest(app);

test("Test that the tickets endpoint exists and return status code 200", async () => {
  const res = await request.get("/ticket");
  expect(res.status).toEqual(200);
});

test("Test that a ticket gets posted with correct title and description", async () => {
  const res = await request
    .post("/ticket")
    .send({ title: "title", description: "desc" });
  expect(res.status).toEqual(201);
  expect(res.body.title).toEqual("title");
  expect(res.body.description).toEqual("desc");
});

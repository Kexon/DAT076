/* import { Task } from "./model/task";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const desc = "Test description";
    const res1 = await request.post("/task").send({description : desc});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.description).toEqual(desc);
    const res2 = await request.get("/task");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((task : Task) => task.description)).toContain(desc);
}); */

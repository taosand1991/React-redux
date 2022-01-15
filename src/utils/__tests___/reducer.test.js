import mainReducer, { fetchTodos } from "../../features/todo/todoSlice";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: { todo: mainReducer } });

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("check for reducer functions", () => {
  expect(mainReducer(undefined, {})).toEqual({
    todos: [],
    status: "idle",
    loading: false,
    error: "",
  });
});

test("should handle  todos fecthing", async () => {
  const todosObject = [
    { userId: 1, id: 3, title: "fugiat veniam minus", completed: false },
  ];

  server.use(
    rest.get("https://jsonplaceholder.typicode.com/todos/", (req, res, ctx) => {
      return res(ctx.json(todosObject), ctx.delay(500));
    })
  );

  await store.dispatch(fetchTodos());

  const state = store.getState();

  expect(state).toEqual({
    todo: {
      error: "",
      todos: todosObject,
      status: "success",
      loading: false,
    },
  });
});

import { render, screen, waitFor, fireEvent } from "./utils/test-utils";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const todos = [
  { userId: 1, id: 3, title: "fugiat veniam minus", completed: false },
];

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos/", (req, res, ctx) => {
    return res(ctx.json(todos));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

test("renders component to the tree", async () => {
  render(<App />);
  expect(await screen.findByText(/Todo Text here/i)).toBeInTheDocument();
  await waitFor(async () => {
    todos.map((todo) => expect(todo.title).toEqual("fugiat veniam minus"));
    expect(screen.getByTestId("todo-item").childElementCount).toEqual(1);
  });
});

test("add todo button functioning", async () => {
  render(<App />);
  const todoButton = screen.getByTestId("todo-add");
  expect(todoButton).toBeInTheDocument();
  fireEvent.click(todoButton);
  expect(screen.getByText(/Add your Todo/i)).toBeInTheDocument();
  expect(screen.getByTestId("todo-button")).toBeInTheDocument();
});

test("to add todo to the list", async () => {
  render(<App />);
  const text = "I have todo here";
  const todo = {
    userId: 1,
    title: text,
    completed: false,
  };
  const todoButton = screen.getByTestId("todo-add");
  expect(todoButton).toBeInTheDocument();
  fireEvent.click(todoButton);
  const todoText = screen.getByTestId("todo-text");
  fireEvent.change(todoText, { target: { value: "I have todo here" } });
  expect(todoText.value).toEqual(text);
  server.use(
    rest.post(
      "https://jsonplaceholder.typicode.com/todos/",
      (req, res, ctx) => {
        return res(ctx.json(todo));
      }
    )
  );
  fireEvent.click(screen.getByTestId("todo-button"));
  expect(todoText.value).toBe("");

  await waitFor(() => {
    const todos = screen.getAllByTestId("todo-item");
    expect(todos.length).toBe(2);
  });
});

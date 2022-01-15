import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    loading: false,
    error: "",
  },
  reducers: {
    clickTodo: (state, action) => {
      const { todoId } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === todoId);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const { todoId } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = state.todos.concat(action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(filterTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
      })
      .addCase(filterTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = action.error.message;
      });
    builder
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clickTodo, deleteTodo } = todoSlice.actions;

export const fetchTodos = createAsyncThunk("todos/getTodos", async () => {
  console.log("it is fetching");
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const result = await response.json();
  return result;
});

export const filterTodos = createAsyncThunk(
  "todos/filterTodos",
  async (value) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const result = await response.json();
    let filterTodo;
    if (value === "true") {
      filterTodo = result.filter((todo) => todo.completed === true);
    } else {
      filterTodo = result.filter((todo) => todo.completed === false);
    }
    return filterTodo;
  }
);

export const addTodo = createAsyncThunk("todo/addTodo", async (data) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
});

export const updateTodo = createAsyncThunk("todo/createTodo", async (data) => {
  const { id } = data;
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/" + id,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
});

export default todoSlice.reducer;

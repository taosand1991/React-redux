import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Stack,
  Flex,
  Select,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, filterTodos } from "../features/todo/todoSlice";
import SpinnerLoad from "../utils/Spinner";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import useInfiniteScroll from "./../utils/useInfiniteScroll";

function TodoList() {
  const dispatch = useDispatch();
  const { status, todos, error } = useSelector((state) => state.todos);
  const [limit, setLimit] = useState(20);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { loading, isComplete, setLoading, setIsComplete } =
    useInfiniteScroll(computeLimit);

  const [todo, setTodo] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status]);

  if (status === "loading") return <SpinnerLoad />;

  const todosLimit = todos.slice(0, limit);

  if (error) {
    alert(error);
  }

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const openEditForm = (todo) => {
    setEditModal(true);
    setTodo(todo);
  };
  const closeEditForm = () => {
    setEditModal(false);
  };

  function computeLimit() {
    if (limit === todos.length) {
      setIsComplete(true);
      setLoading(false);
      return;
    }
    setLimit(limit + 10);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  const handleFilter = (e) => {
    const { value } = e.target;
    dispatch(filterTodos(value));
  };

  return (
    <Box id="main-height" w="100%">
      <AddTodo openModal={openModal} closeModal={closeModal} />
      <EditTodo editModal={editModal} todo={todo} closeEdit={closeEditForm} />
      <Box w="100%" textAlign="center" bg="black" p="5" color="white">
        <Text textAlign="center">Todo Text here</Text>
      </Box>
      <Stack
        w={{ sm: "100%", md: "100%", lg: "50%" }}
        m={{ lg: "auto" }}
        p={[3, 5, 6]}
        fontWeight={{ sm: "bold", md: "bold" }}
        alignItems="center"
        justifyContent="center"
        direction="row"
        spacing={{ sm: 2, md: 5, lg: 10 }}
      >
        <Box
          w={{ sm: "50%", lg: "100%" }}
          textAlign="center"
          fontSize={{ sm: "small", md: "1xl", lg: "3xl" }}
          as="h4"
          textDecoration="underline"
        >
          {" "}
          Todos List
        </Box>
        <Select w={["30%", "50%", "100%"]} ml={[2]} onChange={handleFilter}>
          <option value="">Filter Todos</option>
          <option value={true}>Completed</option>
          <option value={false}>Not Completed</option>
        </Select>
        <Button
          data-testid="todo-add"
          onClick={showModal}
          w={{ sm: "50%", md: "100%", lg: "100%" }}
          color="white"
          bg="teal.400"
          ml={[2]}
          borderRadius="sm"
          p="2"
        >
          Add todo
        </Button>
      </Stack>
      <Flex
        w="100%"
        p="5"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        direction="row"
      >
        {todosLimit.map((todo) => {
          return (
            <TodoCard key={todo.id} todo={todo} openEditForm={openEditForm} />
          );
        })}
      </Flex>
      {loading && !isComplete && (
        <Box textAlign="center">
          <Spinner color="red.500" />
        </Box>
      )}
    </Box>
  );
}

export default TodoList;

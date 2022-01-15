import { Button, Box, Text, Stack } from "@chakra-ui/react";
import { clickTodo, deleteTodo } from "../features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TodoCard = ({ todo, openEditForm }) => {
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);
  const handleClicked = () => {
    dispatch(clickTodo({ todoId: todo.id }));
  };
  const handleDeleteTodo = (id) => {
    setId(id);
    dispatch(deleteTodo({ todoId: id }));
  };
  return (
    <Box
      data-testid="todo-item"
      className="card-height"
      cursor="pointer"
      color="white"
      flexBasis={{ sm: "50%", md: "40%", lg: "20%" }}
      w="100%"
      h="150px"
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="md"
      display="flex"
      justifyContent="center"
      m="5px"
      bg={todo.completed ? "tomato" : "teal.200"}
      onClick={handleClicked}
    >
      <Box textAlign="center" p="5">
        <Text>{todo.title}</Text>
        <Stack p="4" direction="row" spacing={3}>
          <Button
            onClick={() => openEditForm(todo)}
            size="xs"
            color="white"
            bg="orange"
            borderRadius="sm"
            p="3"
          >
            update todo
          </Button>
          <Button
            onClick={() => handleDeleteTodo(todo.id)}
            isLoading={todo.id === id && loading}
            loadingText="deleting.."
            size="xs"
            color="white"
            bg="red"
            borderRadius="sm"
            p="3"
          >
            delete todo
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default TodoCard;

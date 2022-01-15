import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../features/todo/todoSlice";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  Button,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

function EditTodo({ editModal, closeEdit, todo }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(todo.title);
  }, [todo]);

  useEffect(() => {
    if (!loading) {
      closeEdit();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: todo.id,
      title: text,
      completed: false,
    };
    dispatch(updateTodo(data));
  };

  return (
    <Modal isOpen={editModal} onClose={closeEdit}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box p="5">
            <Box textAlign="center" py="4" fontWeight="extrabold" as="h4">
              Edit your Todo
            </Box>
            <FormControl>
              <FormLabel htmlFor="text">Todo text</FormLabel>
              <Input
                value={text}
                onChange={handleChange}
                id="text"
                type="text"
              />
            </FormControl>
            <Button
              disabled={!text}
              isLoading={loading}
              loadingText="Submitting"
              onClick={handleSubmit}
              mt="5"
              color="white"
              bg="green.300"
              borderRadius="2xl"
              p="4"
            >
              Update Todo
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditTodo;

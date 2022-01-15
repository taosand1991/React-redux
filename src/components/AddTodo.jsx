import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
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

function AddTodo({ openModal, closeModal }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (!loading) {
      closeModal();
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userId: 1,
      title: text,
      completed: false,
    };
    dispatch(addTodo(body));
    setText("");
  };

  return (
    <Modal data-testid="add-todo" isOpen={openModal} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box p="5">
            <Box textAlign="center" py="4" fontWeight="extrabold" as="h4">
              Add your Todo
            </Box>
            <FormControl>
              <FormLabel htmlFor="text">Todo text</FormLabel>
              <Input
                data-testid="todo-text"
                value={text}
                onChange={handleChange}
                id="text"
                type="text"
              />
            </FormControl>
            <Button
              data-testid="todo-button"
              disabled={!text}
              isLoading={loading}
              loadingText="Submitting"
              onClick={handleSubmit}
              mt="5"
              color="white"
              bg="orange.300"
              borderRadius="2xl"
              p="4"
            >
              Add Todo
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddTodo;

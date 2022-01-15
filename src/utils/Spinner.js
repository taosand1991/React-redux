import { Box, Spinner } from "@chakra-ui/react";

const SpinnerLoad = () => {
  return (
    <Box
      className="spinner-bg"
      //   display="flex"
      //   justifyContent="center"
      //   alignItems="center"
    >
      <Spinner
        thickness="5px"
        speed="0.85s"
        emptyColor="red.500"
        color="teal.500"
        size="xl"
      />
    </Box>
  );
};

export default SpinnerLoad;

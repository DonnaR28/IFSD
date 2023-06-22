import { Box, useMediaQuery } from "@mui/material";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import CompFracWidget from "scenes/widgets/CompFrac";

const CompoundFraction = () => {
  // const [user, setUser] = useState(null);
  // const { userId } = useParams();
  // const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "85%" : undefined}>
          <CompFracWidget/>
        </Box>
      </Box>
    </Box>
  );
};

export default CompoundFraction;
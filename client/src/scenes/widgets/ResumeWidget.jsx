import {
    ManageAccountsOutlined,
    House,
    Person,
    Work,
    ArtTrack,
    ComputerOutlined,
    Portrait,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const ResumeWidget = ({ userId}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      hardskills,
      softskills,
      workexperience,
      hobbies, 
      education,
      about,
    } = user;
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          <FlexBetween gap="1rem">
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
              Hi, I am {firstName} {lastName}
              </Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
        <Person fontSize="large" sx={{ color: main }} />
        <Typography color={main}>About me:</    Typography>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>{about}</Typography>
          </Box>
        </Box>
        <Divider/>
        <Box p="1rem 0">
          <House fontSize="large" sx={{ color: main }} />
          <Typography color={main}>Education: </Typography>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>{education}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box p="1rem 0">
        <Work fontSize="large" sx={{ color: main }} />
          <Typography color={main}>Skills: </Typography>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>Technical skill:{hardskills},</Typography>
            <Typography color={medium}>Soft skill: {softskills}</Typography>
          </Box>
        </Box>
        <Divider/>
        <Box p="1rem 0">
        <ComputerOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={main}>Experience: </Typography>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>{workexperience}</Typography>
          </Box>
        </Box>
        <Divider/>
    
        <Box p="1rem 0">
        <ArtTrack fontSize="large" sx={{ color: main }} />
          <Typography color={main}>Interest: </Typography>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>{hobbies}</Typography>
          </Box>
        </Box>
        <Divider/>

        <Box p="1rem 0">
        <a target="_blank " href="https://www.linkedin.com/in/donna-r-3b0abb24a/"> 
        <Portrait fontSize="large" sx={{ color: main }} /></a>
          <Typography color={main}>Actual profile </Typography>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>click to know more</Typography>
          </Box>
        </Box>
        <Divider/>
      </WidgetWrapper>
    );
  };
  
  export default ResumeWidget;
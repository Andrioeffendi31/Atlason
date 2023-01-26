import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaSearch, FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutlet } from "react-router";
import { setSearchQuery } from "../actions/geolocations";
import { useIsMounted } from "../Hooks/useIsMounted";

const Root = () => {
  //Sticky Navbar
  const [fix, setFix] = useState(false);
  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { params } = useSelector((state) => state.geolocations);

  const { query, region, sort } = params;

  const location = useLocation();

  useEffect(() => {
    function setFixed() {
      if (window.scrollY >= 500) {
        setFix(true);
      } else {
        setFix(false);
      }
    }
    if (isMounted.current) {
      window.addEventListener("scroll", setFixed);
    }
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, [isMounted]);

  const handleInputChange = (e) => {
    dispatch(setSearchQuery({ ...params, query: e.target.value }));
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${query}`);
      }
    }
  };

  const handleRegionChange = (e) => {
    dispatch(setSearchQuery({ ...params, region: e.target.value }));
  };

  const handleSortChange = (e) => {
    if (sort === "asc") {
      dispatch(setSearchQuery({ ...params, sort: "desc" }));
    } else {
      dispatch(setSearchQuery({ ...params, sort: "asc" }));
    }
  };

  return (
    <Flex align="center" direction="column" w="100%" h="100%">
      <Flex
        w="100%"
        py={4}
        bg={fix ? "frozen" : "accent2"}
        backdropFilter={fix ? "blur(10px)" : "blur(0px)"}
        position={"sticky"}
        justifyContent="center"
        top="0"
        zIndex="1"
        display={fix ? "flex" : "none"}>
        <Flex
          w={{ base: "100vw", md: "80vw", lg: "90vw", xl: "71vw" }}
          justify={{ base: "center", md: "space-between" }}
          align="center">
          <Text
            fontSize={18}
            fontWeight="bold"
            display={{ base: "none", md: "block" }}>
            ATLASON
          </Text>
          <Flex gap={4}>
            <InputGroup w={{ sm: "60vw", md: "40vw", lg: "26vw" }}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch />}
                opacity="0.3"
              />
              <Input
                placeholder="Search"
                fontWeight="medium"
                bg="frozen2"
                variant={"ghost"}
                value={query}
                onInput={handleInputChange}
                onKeyDownCapture={onEnterPress}
              />
            </InputGroup>
            <Flex gap={2}>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />} w="100%">
                  {region}
                </MenuButton>
                <MenuList minW="0" w={"170px"} onClick={handleRegionChange}>
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Africa"}>Africa</MenuItem>
                  <MenuItem value={"Americas"}>Americas</MenuItem>
                  <MenuItem value={"Asia"}>Asia</MenuItem>
                  <MenuItem value={"Europe"}>Europe</MenuItem>
                  <MenuItem value={"Oceania"}>Oceania</MenuItem>
                </MenuList>
              </Menu>
              <Button
                bg={"frozen2"}
                variant={"ghost"}
                onClick={handleSortChange}>
                <FaSort />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}>
          <AnimatedOutlet />
        </motion.div>
      </AnimatePresence>
    </Flex>
  );
};

const AnimatedOutlet = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

export default Root;

import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaSearch, FaSort } from "react-icons/fa";
import { Outlet } from "react-router";
import { useIsMounted } from "../Hooks/useIsMounted";

const Root = () => {
  //Sticky Navbar
  const [fix, setFix] = useState(false);
  const isMounted = useIsMounted();

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
              />
            </InputGroup>
            <Flex gap={2}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaChevronDown />}
                  w="100%"
                  bg="frozen2"
                  variant={"ghost"}>
                  All
                </MenuButton>
                <MenuList minW="0" w={"170px"}>
                  <MenuItem>All</MenuItem>
                  <MenuItem>Africa</MenuItem>
                  <MenuItem>Americas</MenuItem>
                  <MenuItem>Asia</MenuItem>
                  <MenuItem>Europe</MenuItem>
                  <MenuItem>Oceania</MenuItem>
                </MenuList>
              </Menu>
              <Button bg={"frozen2"} variant={"ghost"}>
                <FaSort />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Outlet />
    </Flex>
  );
};

export default Root;

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Countries from "../components/Countries";

import { Button } from "@chakra-ui/button";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaChevronDown, FaSearch, FaSort } from "react-icons/fa";

const Home = () => {
  const { data, isLoading } = useSelector((state) => state.geolocations);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("asc");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    console.log(e.target.value);
  };

  const handleSortChange = (e) => {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  };
  return (
    <Stack w={{ base: "90vw", xl: "80vw" }} align="center" mt={16} spacing={8}>
      <Stack align="center" spacing={6}>
        <Flex
          borderRadius="full"
          overflow={"hidden"}
          w={200}
          h={200}
          align="center"
          justify="center">
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/datafiles/dc49lw7cOTLEo6y/data.json"
            style={{
              height: "238px",
              width: "238px",
              background: "transparent",
            }}
          />
        </Flex>
        <Text
          fontSize={40}
          fontWeight="extrabold"
          fontFamily="poppins"
          color="primary">
          ATLASON
        </Text>
      </Stack>
      <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
        <InputGroup w={{ base: "80vw", sm: "70vw", md: "40vw", lg: "26vw" }}>
          <InputLeftElement
            pt={4}
            pointerEvents="none"
            children={<FaSearch />}
            color="gray.400"
          />
          <Input
            placeholder="Search"
            h={14}
            fontSize={16}
            fontWeight="medium"
            value={query}
            onChange={handleInputChange}
          />
        </InputGroup>
        <Flex gap={2}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaChevronDown />}
              h={14}
              w="100%">
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
          <Button h={14} onClick={handleSortChange}>
            <FaSort />
          </Button>
        </Flex>
      </Flex>

      <Countries
        data={data}
        isLoading={isLoading}
        param={{ query, region, sort }}
      />
    </Stack>
  );
};

export default Home;
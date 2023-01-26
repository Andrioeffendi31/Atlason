import { Image } from "@chakra-ui/image";
import { Flex, Text, Wrap } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router";

const Countries = ({ data, isLoading, param }) => {
  const { searchQuery } = useParams();
  const { region, sort } = param;
  const navigate = useNavigate();

  let filteredCountries = data?.filter((country) => {
    return searchQuery === undefined
      ? region === "All" || country.region === region
      : country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (region === "All" || country.region === region);
  });

  filteredCountries = filteredCountries?.sort((a, b) => {
    if (sort === "asc") {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  });

  return (
    <Wrap
      spacing="30px"
      justify="center"
      px={{ base: "1rem", md: "0" }}
      py={12}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        filteredCountries?.map((country, index) => (
          <Flex
            key={index}
            direction="column"
            width={{ base: "100%", md: "20rem" }}
            bg={"accent1"}
            borderRadius={"xl"}
            overflow={"hidden"}
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            boxShadow="lg"
            cursor={"pointer"}
            onClick={() => navigate(`/country/${country.cca3}`)}>
            <Image
              src={country.flags.svg}
              alt={country.name.common}
              h={{ base: "200px", sm: "280px", md: "200px" }}
              objectFit={"cover"}
            />
            <Flex direction="column" p={8}>
              <Text fontWeight="bold" mb={2}>
                {country.name.common}
              </Text>
              <Flex gap={2}>
                <Text fontWeight="semibold">Population: </Text>
                <Text>{country.population}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Region: </Text>
                <Text>{country.region}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Capital: </Text>
                <Text>{country.capital}</Text>
              </Flex>
            </Flex>
          </Flex>
        ))
      )}
    </Wrap>
  );
};

export default Countries;

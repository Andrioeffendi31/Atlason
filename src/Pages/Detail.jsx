import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { AspectRatio, Flex, Stack, Text, Wrap } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchDetails } from "../actions/geolocations";

const Detail = () => {
  const { country } = useParams();
  const dispatch = useDispatch();

  const countryDetails = useSelector((state) =>
    state.geolocations.data.filter(
      (countryDetail) => countryDetail.cca3 === country
    )
  );

  console.log(countryDetails);

  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(fetchDetails(country));
  }, [dispatch, country]);

  return (
    <Stack w={{ base: "90vw", xl: "78vw" }} my={16} spacing={8} h="100vh">
      <Button as={Link} to="/" w="100px" gap={2} pl={1}>
        <FaChevronLeft />
        Back
      </Button>
      <Flex
        justify={{ base: "center", xl: "space-between" }}
        gap={20}
        w="100%"
        flexDir={{ base: "column", xl: "row" }}>
        <AspectRatio
          w={{ base: "100%", lg: "58vw", xl: "68vw" }}
          ratio={16 / 9}
          borderRadius="xl"
          boxShadow={"lg"}
          overflow="hidden">
          <Image
            fallback={<div>Loading...</div>}
            src={countryDetails[0]?.flags.png}
            alt={countryDetails[0]?.name.common}
          />
        </AspectRatio>
        <Stack w="100%" spacing={8}>
          <Text fontSize="3xl" fontWeight="bold">
            {countryDetails[0]?.name.common}
          </Text>
          <Wrap fontSize={"lg"} spacingX={"4rem"} spacingY={2}>
            <Stack spacing={2}>
              <Flex gap={2}>
                <Text fontWeight="semibold">Native Name:</Text>
                <Text>
                  {countryDetails[0]?.name.nativeName !== undefined
                    ? Object.values(countryDetails[0]?.name.nativeName)[0]
                        .common
                    : "N/A"}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Population:</Text>
                <Text>{countryDetails[0]?.population}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Region:</Text>
                <Text>{countryDetails[0]?.region}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Sub Region:</Text>
                <Text>
                  {countryDetails[0]?.subregion
                    ? countryDetails[0]?.subregion
                    : "N/A"}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Capital:</Text>
                <Text>
                  {countryDetails[0]?.capital
                    ? countryDetails[0]?.capital
                    : "N/A"}
                </Text>
              </Flex>
            </Stack>
            <Stack spacing={2}>
              <Flex gap={2}>
                <Text fontWeight="semibold">Top Level Domain:</Text>
                <Text>{countryDetails[0]?.tld[0]}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Currencies:</Text>
                <Text>
                  {countryDetails[0]?.currencies !== undefined
                    ? Object.values(countryDetails[0]?.currencies)[0].name
                    : "N/A"}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="semibold">Languages:</Text>
                <Text>
                  {countryDetails[0]?.languages !== undefined
                    ? Object.values(countryDetails[0]?.languages)[0]
                    : "N/A"}
                </Text>
              </Flex>
            </Stack>
          </Wrap>
          <Flex gap={2} flexWrap="wrap" align={"center"} mt="6 !important">
            <Text fontWeight="semibold">Border Countries:</Text>
            {countryDetails[0]?.borders !== undefined ? (
              countryDetails[0]?.borders.map((border) => (
                <Button key={border} as={Link} to={`/country/${border}`}>
                  {border}
                </Button>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Detail;

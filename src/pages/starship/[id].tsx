import { Box, Heading, SimpleGrid, Link } from "@chakra-ui/core";
import React from "react";
import { People } from "../../interfaces/swapi";
import {
  getPeopleByID,
  getStarshipByID,
  getStarship,
  getPeopleByUrl,
} from "../../services/swapi";
import NextLink from "next/link";
import Navbar from "../../components/Navbar"

export default function StarshipById({ starship, pilots }) {
  const id = pilots.map((pilot) => {
    const temp = pilot.url.split("/");
    return temp[temp.length - 2];
  });
  return (
    <div>
      <Navbar/>
      <Heading mb={4}>This is {starship.name} starship. Its pilots are listed below</Heading>
      <SimpleGrid columns={4} spacing={4}>
        {pilots.map((pilot, idx) => (
          <Box key={idx} bg="gray.200" p={4} borderRadius="md">
            <NextLink href={`/people/${id[idx]}`} passHref={true}>
              <Link fontSize="lg" color="blue.500">
                {pilot.name}
              </Link>
            </NextLink>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const url = [`http://swapi.dev/api/starships/${params.id}`];

  const [starship] = await Promise.all(url.map((u) => getStarshipByID(u)));

  const pilots = await Promise.all(
    starship.pilots.map((URL) => getPeopleByUrl(URL))
  );

  return {
    props: {
      starship,
      pilots,
    },
  };
}

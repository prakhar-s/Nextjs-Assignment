import { Box, Heading, SimpleGrid, Link } from "@chakra-ui/core";
import React from "react";
import { People } from "../../interfaces/swapi";
import {
  getPeopleByID,
  getStarshipByID,
  getStarship,
} from "../../services/swapi";
import NextLink from "next/link";
import Navbar from "../../components/Navbar"

interface PeopleByIdProps {
  people: People;
  starships;
}

export default function PeopleById({ people, starships }) {
  const id = starships.map((starship, idx) => {
    const temp = starship.url.split("/");
    return temp[temp.length - 2];
  });

  return (
    <div>
      <Navbar/>
      <Heading mb={4}> I am  {people.name}. My Starships are listed here</Heading>
      <SimpleGrid columns={4} spacing={4}>
        {starships.map((starship, idx) => (
          <Box key={idx} bg="gray.200" p={4} borderRadius="md">
            <NextLink href={`/starship/${id[idx]}`}>
              <Link fontSize="lg" color="blue.500">
                {starship.name}
              </Link>
            </NextLink>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { data: people } = await getPeopleByID(params.id);
  const starships = await Promise.all(
    people.starships.map((URL) => getStarshipByID(URL))
  );

  return {
    props: {
      people,
      starships,
    },
  };
}

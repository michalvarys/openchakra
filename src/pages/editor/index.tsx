import { Box, Heading, Link, Menu, MenuItem } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import axios from 'axios'
import React from "react";


interface Props {
  files: string[];
}

function PageList(props: Props){
  const { files } = props;

  return (
    <Box h="100vh" w="full" maxW="300px"  border="thin" borderStyle="solid" borderColor="gray.400">
      <Heading background="gray.100" size="sm" py={2} px={3} borderBottom="thin" borderStyle="solid" borderColor="gray.200">Stránky</Heading>
      <Menu>
        {files.map((page) => (
          <MenuItem as={Link} w="full" _hover={{ background: 'gray.50'}} px={3} href={`/editor/${page}`} key={page}>
            {page}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios("/api/app/pages");
  const { files } = res.data
  return {
    props: { files },
  };
};

export default PageList;
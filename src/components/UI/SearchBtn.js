import React from "react";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

const SearchBtn = () => {
  return (
    <Container>
      <SearchIcon />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #6d6d6d;
  padding: 12px 55px;
  width: 143px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d6d6d;
  color: #ffff;
  cursor: pointer;
`;

const SearchIcon = styled(FaSearch)`
  color: #ffff;
  font-size: 20px;
`;

export default SearchBtn;

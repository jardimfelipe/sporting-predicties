import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
  @media screen and (max-width: 1199px) {
    max-width: 960px;
  }
  @media screen and (max-width: 991px) {
    max-width: 720px;
  }
  @media screen and (max-width: 767px) {
    max-width: 540px;
  }
`;

import styled from "styled-components";

interface IBox {
  params: object;
}

export const Box = styled.div`
  ${({ params }: IBox) =>
    Object.keys(params).reduce((curr: string, key: string) => {
      curr += `${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}: ${
        params[key as keyof typeof params]
      };`;
      return curr;
    }, "")}
`;

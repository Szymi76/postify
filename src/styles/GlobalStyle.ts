import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${props => props.theme.palette.gray[50]};
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${props => props.theme.palette.gray[200]};
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${props => props.theme.palette.gray[300]};
}
`;

import { css, keyframes } from "styled-components";

const appearFromBottom = keyframes`
    0% { transform: translateY(100%) }
    100% { transform: translateY(0%) }
  `;

const scaleIn = keyframes`
    0% { transform: scale(.5) }
    100% { transform: scale(1) }
`;

const slideInFromRight = keyframes`
    0% { transform: translateX(100%) }
    100% { transform: translateX(0%) }
`;

const slideInToRight = keyframes`
    0% { transform: translateX(0%) }
    100% { transform: translateX(100%) }
`;

const heightFromTop = keyframes`
    0% { height: 0px }
    100% { height: 100% }
`;

const scaleFromTopRight = keyframes`
  0% { transform: translateX(25%) translateY(-25%); scale: .5;}
  100% { transform: translateX(0%) translateY(0%); scale: 1;}
`;

const pulse = keyframes`
  50% { opacity: .5 }
`;

export {
  appearFromBottom,
  scaleIn,
  slideInFromRight,
  slideInToRight,
  heightFromTop,
  scaleFromTopRight,
  pulse,
};

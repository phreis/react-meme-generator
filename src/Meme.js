/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const color = '#204E4A';
const memeStyles = css`
  border-radius: 16px;
  background-color: green;
  color: ${color};
`;

export default function Meme(props) {
  return (
    <img
      css={memeStyles}
      data-test-id="meme-image"
      src={props.memeURL}
      alt="Meme"
    />
  );
}

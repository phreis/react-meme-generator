/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const color = '#204E4A';

const formStyles = css`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const controlPanelStyles = css`
  border: solid;
  border-radius: 16px;
  background-color: #ecba82;
  color: ${color};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-bottom: 16px;
`;

export default function ControlPanel(props) {
  return (
    <div css={controlPanelStyles}>
      <form
        css={formStyles}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="topText">Top text</label>
        <input
          onInput={(event) => {
            props.setTopText(event.target.value);
          }}
          value={props.topText}
          id="topText"
        />

        <label htmlFor="bottomText">Bottom text</label>
        <input
          onInput={(event) => {
            props.setBottomText(event.target.value);
          }}
          value={props.bottomText}
          id="bottomText"
        />

        <label htmlFor="template">Meme template</label>
        <input
          onInput={(event) => {
            props.setTemplate(event.target.value);
          }}
          value={props.template}
          id="template"
        />
        <button
          data-test-id="generate-meme"
          onClick={() => props.generateMeme()}
        >
          Generate
        </button>
      </form>
      <button onClick={() => props.downloadMeme()}>Download</button>
    </div>
  );
}

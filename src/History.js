/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const color = '#204E4A';

const historyStyles = css`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: top;
  gap: 12px;
  color: ${color};
`;
const historyElementStyles = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 12px;
  align-items: left;
  border-radius: 16px;
  border-color: black;
  background-color: #81c14b;
  padding: 10px;
`;
export default function History(props) {
  return (
    <section css={historyStyles}>
      {props.historyEntries.toReversed().map((entry) => {
        return (
          <div css={historyElementStyles} key={`history-id-${entry.id}`}>
            <img
              onKeyDown={() => {
                props.showMeme({
                  memeTopText: entry.memeTopText,
                  memeBottomText: entry.memeBottomText,
                  memeTemplate: entry.memeTemplate,
                });
              }}
              src={entry.memeThumbnailURL}
              alt="Thumbnail"
              width="100"
              height="100"
              role="presentation"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>ID: {entry.id}</span>
              <span>Top Text: {entry.memeTopText}</span>
              <span>Bottom Text: {entry.memeBottomText}</span>
              <span>Template: {entry.memeTemplate}</span>
            </div>
            <button
              onClick={() => {
                props.showMeme({
                  memeTopText: entry.memeTopText,
                  memeBottomText: entry.memeBottomText,
                  memeTemplate: entry.memeTemplate,
                });
              }}
            >
              Show
            </button>
          </div>
        );
      })}
    </section>
  );
}

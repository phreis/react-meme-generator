import './bodyStyles.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import ControlPanel from './ControlPanel';
import History from './History';
import Meme from './Meme';

const color = '#204E4A';

const sectionStyles = css`
  background-color: #2e933c;
  border-radius: 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const leftColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  gap: 12px;
  color: ${color};
`;

const rightColumn = css``;

const columnStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
`;

/* const _historyEntries = [
  {
    id: 1,
    memeTopText: 'memes',
    memeBottomText: 'memes_everywhere',
    memeTemplate: 'buzz',
    memeURL: 'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
  },
  {
    id: 2,
    memeTopText: '_',
    memeBottomText: "it's_a_trap!",
    memeTemplate: 'ackbar',
    memeURL: "https://api.memegen.link/images/ackbar/_/it's_a_trap!.png",
  },
  {
    id: 3,
    memeTopText: "i_don't_know_what_this_meme_is_for",
    memeBottomText: "and_at_this_point_i'm_too_afraid_to_ask",
    memeTemplate: 'afraid',
    memeURL:
      "https://api.memegen.link/images/afraid/i_don't_know_what_this_meme_is_for/and_at_this_point_i'm_too_afraid_to_ask.png",
  },
]; */

function getMemeURL(meme) {
  let memeURL;
  let memeTemplate = meme.template;

  if (!meme.template) {
    memeTemplate = 'buzz';
  }
  memeURL = `https://api.memegen.link/images/${memeTemplate}`;
  if (meme.topText) {
    memeURL += `/${encodeURIComponent(encodeURIComponent(meme.topText))}`;
  } else {
    memeURL += `/_`;
  }

  if (meme.bottomText) {
    memeURL += `/${encodeURIComponent(encodeURIComponent(meme.bottomText))}`;
  }

  memeURL += `.png`;

  if (meme.thumbnail) {
    memeURL += `?height=100&width=100`;
  }
  return memeURL;
}

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [template, setTemplate] = useState('');
  const [memeURL, setMemeURL] = useState(
    'https://api.memegen.link/images/buzz.png',
  );

  let historyEntries = [];
  const historyEntriesTmp = JSON.parse(localStorage.getItem('memeHistory'));
  if (historyEntriesTmp) historyEntries = historyEntriesTmp;

  function generateMeme() {
    setMemeURL(
      getMemeURL({
        template: template,
        topText: topText,
        bottomText: bottomText,
      }),
    );
    historyEntries.push({
      id: historyEntries.length + 1,
      memeTopText: topText,
      memeBottomText: bottomText,
      memeTemplate: template,
      memeThumbnailURL: getMemeURL({
        template: template,
        topText: topText,
        bottomText: bottomText,
        thumbnail: true,
      }),
    });
    localStorage.setItem('memeHistory', JSON.stringify(historyEntries));
  }

  function showMeme(meme) {
    const tmpMemeURL = getMemeURL({
      template: meme.memeTemplate,
      topText: meme.memeTopText,
      bottomText: meme.memeBottomText,
    });
    console.log(tmpMemeURL);
    setMemeURL(tmpMemeURL);
  }

  function downloadMeme() {
    saveAs(memeURL, `meme-${template}`);
  }

  return (
    <main>
      <section css={sectionStyles}>
        <div css={columnStyle}>
          <div css={leftColumn}>
            <Meme memeURL={memeURL} />
            <ControlPanel
              topText={topText}
              setTopText={setTopText}
              bottomText={bottomText}
              setBottomText={setBottomText}
              template={template}
              setTemplate={setTemplate}
              generateMeme={generateMeme}
              downloadMeme={downloadMeme}
            />
          </div>
          <div css={rightColumn}>
            <History historyEntries={historyEntries} showMeme={showMeme} />
          </div>
        </div>
      </section>
    </main>
  );
}

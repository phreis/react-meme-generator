/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import { useState } from 'react';

function getMemeURL(meme) {
  let memeURL;
  if (meme.template) {
    memeURL = `https://api.memegen.link/images/${meme.template}`;
    if (meme.topText) {
      memeURL += `/${meme.topText}`;
      if (meme.bottomText) {
        memeURL += `/${meme.bottomText}`;
      }
    }
  } else {
    throw new Error('Template missing!');
  }

  return `${memeURL}.png`;
}

function ControlPanel(props) {
  return (
    <div>
      <form
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
        <br />
        <label htmlFor="bottomText">Bottom text</label>
        <input
          onInput={(event) => {
            props.setBottomText(event.target.value);
          }}
          value={props.bottomText}
          id="bottomText"
        />
        <br />
        <label htmlFor="template">Meme Template</label>
        <input
          onInput={(event) => {
            props.setTemplate(event.target.value);
          }}
          value={props.template}
          id="template"
        />

        <br />
        <br />
        <br />
        <br />
        <button
          data-test-id="generate-meme"
          onClick={() => props.generateMeme()}
        >
          Generate
        </button>
      </form>
      <br />
      <br />
      <br />
      <button onClick={() => props.downloadMeme()}>Download</button>
    </div>
  );
}

function Meme(props) {
  return <img data-test-id="meme-image" src={props.memeURL} alt="Meme" />;
}

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [template, setTemplate] = useState('');
  const [memeURL, setMemeURL] = useState(
    'https://api.memegen.link/images/buzz.png',
  );

  function generateMeme() {
    console.log('generateMeme');
    setMemeURL(
      getMemeURL({
        template: template,
        topText: topText,
        bottomText: bottomText,
      }),
    );
  }

  function downloadMeme() {
    saveAs(memeURL, `meme-${template}-${topText}-${bottomText}`);
  }

  return (
    <>
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
      <Meme memeURL={memeURL} />
    </>
  );
}

import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Settings, importer, model} from "@coderline/alphatab";
import AlphaTab from './AlphaTab';

function App() {
  const [score, setScore] = useState<model.Score>(new model.Score());
  const [render, setRender] = useState(false);
  const fileChange = useCallback(async (e : any) => {
    if (e.target.files === null) {
      return;
    }
    const ff = e.target.files[0];
    const buffer = new Uint8Array(await ff.arrayBuffer());
    const settings = new Settings();
    const scoreObj = importer.ScoreLoader.loadScoreFromBytes(
      new Uint8Array(buffer),
      settings
    );
    setScore(scoreObj);
    setRender(true);
  }, []);

  return (
    <div className="App">
    <input type={'file'} onChange={fileChange}/>
    <AlphaTab score={score} render={render} />
    </div>
  );
}

export default App;

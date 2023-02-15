import React, { useEffect, useState, useRef, MutableRefObject, RefObject } from "react";
import * as alphaTab from "@coderline/alphatab";

interface Props {
  score: alphaTab.model.Score;
  render: boolean;
}

export default function AlphaTab({score, render} : Props) {
  const ref : RefObject<HTMLDivElement> = useRef(null);
  const apiRef = useRef() as MutableRefObject<any>;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!render) return;
    if (ref.current) {
        // THIS DOES NOT WORK
    apiRef.current = new alphaTab.AlphaTabApi(ref.current, {
        player: {
          enablePlayer: true,
          enableUserInteraction: true,
          enableCursor: true,
          soundFont: require('@coderline/alphatab/soundfont/sonivox.sf2')
        }
      });
      // THIS WORKS
      /*
      apiRef.current = new window.alphaTab.AlphaTabApi(ref.current, {
        player: {
          enablePlayer: true,
          enableUserInteraction: true,
          enableCursor: true,
          soundFont: require('@coderline/alphatab/soundfont/sonivox.sf2')
        }
      });
      */
      apiRef.current.renderScore(score, [0, 1]);
      
  }

    apiRef.current.soundFontLoaded.on(() => {
      setLoaded(true);
    });

  }, [render]);

  return (
    <div className="App">
      <button
        onClick={() => {
            if (apiRef.current) {
                apiRef.current.play();

            }
        }}
        disabled={!loaded}
      >
        play
      </button>
      <button
        onClick={() => {
          apiRef.current.pause();
        }}
        disabled={!loaded}
      >
        pause
      </button>
      <div ref={ref}>

      </div>
    </div>
  );
}
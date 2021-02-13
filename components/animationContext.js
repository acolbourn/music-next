import { useState, createContext } from 'react';

export const AnimationContext = createContext();

export const AnimationContextProvider = (props) => {
  // Turn background image on/off
  const [backToggle, setBackToggle] = useState(true);
  const backgroundRef = useRef('isOn');

  const onStart = () => {
    console.log('Animation started', backgroundRef.current);
    if (backgroundRef.current !== 'isOn') {
      setBackToggle(true);
      backgroundRef.current = 'isOn';
    }
  };

  function onEnd() {
    console.log('Animation completed', backgroundRef.current);
    if (backgroundRef.current !== 'isOff') {
      setBackToggle(false);
      backgroundRef.current = 'isOff';
    }
  }

  const [scale, setScale] = useState({
    root: initialKeySig.root,
    type: initialKeySig.type,
  });
  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {props.children}
    </ScaleContext.Provider>
  );
};

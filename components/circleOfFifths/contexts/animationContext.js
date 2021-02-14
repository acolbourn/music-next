import { useState, createContext } from 'react';

export const AnimationContext = createContext();

export const AnimationContextProvider = (props) => {
  // Turn background image on during animation, off after.
  const [isBackground, setIsBackground] = useState(true);

  return (
    <AnimationContext.Provider value={{ isBackground, setIsBackground }}>
      {props.children}
    </AnimationContext.Provider>
  );
};

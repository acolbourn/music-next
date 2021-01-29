import { useState, createContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { validateRoute } from '../CircleOfFifths/circleConstants';

export const ScaleContext = createContext();

export const ScaleContextProvider = (props) => {
  // Get initial scale from react-router-dom URL
  //   let { scaleId } = useParams();
  //   let [initialKeySig] = validateRoute(scaleId);

  //   const [scale, setScale] = useState({
  //     root: initialKeySig.root,
  //     type: initialKeySig.type,
  //   });
  const [scale, setScale] = useState({
    root: 'C',
    type: 'major',
  });
  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {props.children}
    </ScaleContext.Provider>
  );
};

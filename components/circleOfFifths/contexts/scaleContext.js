import { useState, createContext } from 'react';
import { validateRoute } from '../circle/circleConstants';
import { useRouter } from 'next/router';

export const ScaleContext = createContext();

export const ScaleContextProvider = (props) => {
  // Get initial scale from router
  const router = useRouter();
  const URLScale = router.query.scale;
  let [initialKeySig] = validateRoute(URLScale);

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

import { useState, useEffect, useCallback } from 'react';

// Returns the width and height of a ref
function useDimensions(elementRef) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    if (elementRef && elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setDimensions({ width: width, height: height });
    }
  }, [elementRef]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  return [dimensions];
}

export default useDimensions;

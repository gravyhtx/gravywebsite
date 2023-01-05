import { useEffect, useState } from "react";
import { debounce } from "../helpers/performanceEnhancers";
// import { useDebounce } from 'use-debounce';

interface Size {
  width: number;
  height: number;
}

const useWindowSize = (
  enhanced?: boolean,
  delay?: number,
) => {

  // const isBrowser = typeof window !== `undefined`;
  // if (!isBrowser) return undefined;

  enhanced = enhanced ? enhanced : true;
  delay = delay && enhanced ? delay : !delay && enhanced ? 210 : null;
  // The size of the window
  const [size, setSize] = useState<Size>({width: null, height: null});

  // This function updates the state thus re-render components
  const resizeHanlder = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setSize({
      width: width,
      height: height,
    });
  };

  // Listening for the window resize event
  useEffect(() => {
    resizeHanlder();
    // Use debounce unless 'enhanced' is set to 'false'
    const handler = enhanced === true ? debounce(resizeHanlder, delay) : resizeHanlder;

    window.addEventListener('resize', handler);

    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, [delay]);

  const width = size.width;
  const height = size.height;

  const breakpoint = (width: number | boolean) => {
    switch(width) {
      case width < 576:
        return { device: 'xs', group: 0 };
      case width >= 576 && width < 768:
        return { device: 'sm', group: 1 };
      case width >= 768 && width < 1024:
        return { device: 'md', group: 2 };
      case width >= 862 && width < 1024:
        return { device: 'lg', group: 2 };
      case width >= 1024 && width < 1200:
        return { device: 'xl', group: 3 };
      case width >= 1200 && width < 1400:
        return { device: 'xxl', group: 4 };
      case width >= 1400:
        return { device: 'ultra', group: 5 };
    }
  }

  return {
    size: size,
    width: width,
    height: height,
    isMobile: width < 768,
    isDesktop: width >= 1024,
    tabletBreak: width <= 1366,
    breakpoint: breakpoint(width),
  };
}

export default useWindowSize;
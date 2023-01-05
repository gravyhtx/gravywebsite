import { useEffect, useState, Fragment, ReactNode, } from 'react';
import Image from 'next/image';

// GLIDER
import Glider from '../carousel/Glider';
import GliderPanel from '../carousel/GliderPanel';

// SLIDES
// IMPORT SLIDE IMAGES HERE

// LOGO
// IMPORT LOGO HERE

import styles from './styles/hero.module.css';

const homeSlides = [ 'hero0', 'hero1', 'hero2', 'hero3' ];

const heroSlide = (
  index?: number,
  opts?: {
    map?: boolean | undefined,
    rotate?: boolean | undefined,
  }
) => {

  const [timer, setTimer] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  // let timer = 0; // let imgIndex = 0; // let fadeOut = false;
  
  useEffect(() => {
    const time = setInterval(() => {
      if(timer < 25) {
        setFadeOut(timer >= 23 ? true : false);
        setTimer(timer+1)
      }
      else {
        setTimer(0);
        setFadeOut(false)
        setImgIndex(imgIndex < homeSlides.length - 1 ? imgIndex + 1 : 0);
      }
    }, 1000);
    return () => clearInterval(time);
  }, [timer, imgIndex, fadeOut]);

  const fade = fadeOut === true ? styles.out : styles.in;

  const display = (index: number) => {
    return opts.map === true && opts.map !== undefined ? { display: imgIndex === index ? 'block' : 'none' } : null;
  }

  return (<>
    {/* 
      <Image className={styles.slide + ' ' + fade}
        style={display(index)}
        src={homeSlides[imgIndex]}
        alt={`Hero Image ${imgIndex+1}`}
        sizes="100vw"
        placeholder="blur"
        quality={80}
        fill={true} /> */}
  </>)
}


export const HomepageHero = () => {
  const opts = {
    map: false,
    rotate: false,
  }

  return (
    <div className={styles.homepageHero}>
      { heroSlide(0, opts) }
    </div>
  )
}
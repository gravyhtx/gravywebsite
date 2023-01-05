import { FC } from "react";
import Image from "next/image";

import { Color, acceptsColor } from 'gravy';

import website from '../../config/site-data.json';

// FALLBACK LOGOS
import gravy_logo from '../../public/images/logos/gravy_rasta.svg';
// import g_logo from '../../public/images/logos/g/gravy_g.svg';

// GRAVY LOGOS
import logo_outline from '../../public/images/logos/gravy_outline.svg';
import logo_inner from '../../public/images/logos/gravy_inner.svg';
import logo_rasta from '../../public/images/logos/gravy_rasta.svg';
import logo_gray1 from '../../public/images/logos/gravy-fill-gray1.svg';
import logo_gray2 from '../../public/images/logos/gravy-fill-gray2.svg';
import logo_gray3 from '../../public/images/logos/gravy-fill-gray3.svg';
import logo_white from '../../public/images/logos/gravy-fill-white.svg';
import logo_rect_cut from '../../public/images/logos/gravy_rectangle-cutout-outline.svg';
import logo_rect_fill from '../../public/images/logos/gravy_rectangle-fill-outline.svg';

// GRAVY "G" LOGOS
// import g_fill from '../../public/images/logos/g/gravy_g.svg';

import styles from './styles/logo.module.css';

interface LogoProps {
  version?: 'default' | 'rasta' | 'outline' | 'inner' | 'gray' | 'white' | 'rectangle' | 'vhs' | undefined;
  type?: number | 'cutout' | 'fill' | undefined;
  classes?: any | undefined;
  color?: Color;
  wrapper?: {
    padding?: number,
  };
  container?: {
    position?: 'relative' | 'fixed' | undefined,
  };
}

export const GravyLogo: FC<LogoProps> = ({ version, type, classes, color, wrapper, container }) => {

  version = version ? version : 'default';

  console.log(acceptsColor(color));

  const logoClasses = classes ? styles.logo+" "+classes+" " : styles.logo;
  const logoAlt = website.name ?  website.name +  " Site Logo" : "Site Logo";

  const logoSel = () => {
    switch(version) {
      case 'rasta':
        return logo_rasta;
      case 'outline':
        return logo_outline;
      case 'inner':
        return logo_inner;
      case 'gray':
        if(type === 1) {
          return logo_gray1
        }
        if(type === 2) {
          return logo_gray2
        }
        if(type === 3) {
          return logo_gray3
        }
      case 'white':
        return logo_white;
      case 'rectangle':
        if(type === 'cutout') {
          return logo_rect_cut;
        }
        if(type === 'fill') {
          return logo_rect_fill;
        }
      case 'vhs':
        console.warn('"VHS" Logo is not uploaded yet. Switched to "Default" Logo.')
        return gravy_logo;
      case 'default':
      default:
        return gravy_logo;
    }
  }

  const logo = logoSel();

  const ws = wrapper;
  const cs = container;

  const logoStyles = {
    wrapper: {
      padding: ws.padding ? ws.padding.toString() : null,
    },
    container: {
      position: cs.position ? cs.position : 'relative',
    }
  }

  return (
    <div className={styles.wrapper} style={logoStyles.wrapper}>
      <div className={styles.container} style={logoStyles.container}>
        <Image className={logoClasses+"site-logo"} src={logo} width={logo.width} height={logo.height} alt={logoAlt} sizes="100vw" placeholder="blur" />
      </div>
    </div>
  )
}

// interface GravyGProps {
//   background: 'circle' | 'square' | 'none' | boolean | undefined;
//   color: string;
//   classes: string;
//   styles: any;
// }

// export const GravyG: FC<GravyGProps> = ({ background, color, classes, styles }) => {
//   const colorSel = acceptsColor(color);
//   const logoStyle = styles ? styles : null;
//   const logoClasses = classes ? classes+" " : "";

//   const logoSel = () => {
//     return {
//       logo: logo,
//       alt: "Grävy Design Co. - Logo"
//     }
//   }

//   return (
//     <div className={logoClasses+"site-logo"}>
//       <Image src={logo} width={logo.width} height={logo.height} alt={logoAlt} style={logoStyle} sizes="100vw" placeholder="blur" />
//     </div>
//   )
// }
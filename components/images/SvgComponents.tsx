import Link from "next/link";
import { Color, acceptsColor } from 'gravy';

import { FC, ReactNode, } from "react";
import website from '../../config/site-data.json';
import { imageSizeObj, checkType } from "../../utils/validation";

import styles from 'svgContainer.module.css';

interface ContainerProps {
  children?: ReactNode;
  link?: string | true |  undefined;
  classes?: {
    container?: string | undefined;
    link?: string | undefined;
  };
}

interface SvgImgProps extends ContainerProps {
  svg: { src: string };
  useContainer?:  boolean | undefined;
  classes?: {
    container?: string | undefined;
    link?: string | undefined;
    svg?: string | undefined;
  };
  styleProps?: {
    margin: string | "0 auto";
    maxWidth: string | null;
    color: Color | null;
    filter: 'invert' | 'invert(100%)' | null;
    [key: string]: string;
  };
  drag?: boolean | undefined;
  description?: string | undefined;
  id?: string | undefined;
}

// SVG TO IMG COMPONENT
// Use <img> tag to show a dynamic SVG element
export const SvgContainer: FC<ContainerProps> = ({ children, link, classes }) => {

  const cls = {
    container: classes.container ? classes.container+' '+styles.container : styles.container,
    link: classes.link ? classes.link+' '+styles.link : 'svg-img '+styles.link,
  }

  link = link && link !== undefined ? link : undefined;
             
  const container =
    <div className={"svg-container"+cls.container}>
      { children }
    </div>

  return (<>
    { link !== undefined
      ? <Link href={ link === true ? '/' : link } className={cls.link?cls.link:''}  target="_blank">
          { container }
        </Link>
      : container }
  </>)
}

export const SvgImg: FC<SvgImgProps> = ({ svg, useContainer, styleProps, drag, description, link, classes, id }) => {
  
  useContainer = useContainer === true ? true : false;

  if(!acceptsColor(styleProps.color) && styleProps.color !== 'invert') {
    styleProps.color = null;
  }
  if(styleProps.filter === 'invert') {
    styleProps.filter = 'invert(100%)'
  }

  const svgStyles = styleProps ? { ...styleProps } : {};
  const cls = {
    container: classes.container ? classes.container+' '+styles.container : styles.container,
    link: classes.link ? classes.link+' '+styles.link : 'svg-img '+styles.link,
    svg = classes ? classes+' '+styles.svg : styles.svg;
  }

  const img =
    <img
      style={svgStyles}
      src={svg.src}
      className={cls.svg}
      draggable={drag}
      alt={description}
      id={id} />
  
  return useContainer === true
    ? <SvgContainer link={link}>{img}</SvgContainer>
    : img
}


// SVG ICON
// Container for SVG icons
export const SvgIcon = ({ svg, classes, link, onClick, linkClasses, target }) => {
  // Check imported as Next image -- Next uses 'image.src' to get the location
  const data = svg.src ? svg : { src: svg };
  const dataSrc = data.src;

  //
  link = link === true ? '/' : link ? link : '';
  linkClasses = linkClasses ? linkClasses : '';

  // Default 'target' to new tab ("_blank")
  target =
    (target === 'self' || target === false) ? '_self' :
    target === 'parent' ? '_parent' :
    '_blank';

  return (<span>
    { link && !onClick
      ? <Link href={link} target={target}>
          <a className={linkClasses} target="_blank">
            <img className={"svg icon-class"+classes} src={dataSrc} />
          </a></Link>
    : !link && onClick
      ? <a className={linkClasses} href="javascript:void(0);" onClick={onClick}>
          <img className={"svg icon-class"+classes} src={dataSrc} />
        </a>
      : <img className={"svg icon-class"+classes} src={dataSrc} /> }
    </span>
  )
}

// SVG ACTION ICON
// Container for SVG icons
export const SvgActionIcon = ({ svg, classes, linkClasses, onClick }) =>{
  return (
    <a className={linkClasses} href="javascript:void(0);" onClick={onClick}>
      <SvgImg svg={svg} classes={{ svg: classes }} />
    </a>
  )
}


// SVG OBJECT CONTAINER
// Container for SVGs
export const SvgObject = ({ svg, classes, color, styles, alt, sizeObj, margins, maxWidth, useFallback }) => {
  // https://vecta.io/blog/best-way-to-embed-svg#2-using-an--object--tag
  const data = svg.src ? svg : { src: svg };
  const dataSrc = data.src;
  
  alt = alt ? alt : `${website.name} Site Image`;
  
  classes = classes && classes !== undefined ? ' '+classes : '';

  const size = sizeObj === true ? { width: data.width, height: data.height }
    : sizeObj !== undefined && sizeObj !== true && sizeObj !== false ? imageSizeObj(sizeObj) : false;

  // SVG  COLORS IN AVAILABLE ASS CSS CLASSES
  //  Search for available classes by '.svg-color_'
  color=checkType(color, 'string')?"svg-color-"+color:null;
  // ADDITIONAL STYLES MAY BE USED
  // COLOR MAY ALSO BE CHANGED USING THE 'filter' PROPERTY
  styles=checkType(styles, 'object')?styles:{};

  margins=margins?margins:"0 auto";

  // IMAGE STYLES
  const imageStyles = {
    margin:margins,
    maxWidth:maxWidth?maxWidth:null,
    styles
  }
  
  // FALLBACK IMAGE
  const fallback = useFallback === true ? <img alt={alt} className={"svg-fallback"+classes} src={dataSrc} /> : <></>;
  
  return(<>
    {size !== false ?
      <object style={imageStyles ? imageStyles : {}} className={"svg-container"+classes} width={size.width} height={size.height} type="image/svg+xml" data={dataSrc}>
        { fallback }
      </object>
    : <object className={"svg-container"+classes} type="image/svg+xml" data={dataSrc}>
        { fallback }
      </object>
    }
  </>)
}
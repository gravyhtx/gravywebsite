import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { checkType } from "../../utils/validation";

interface Props {
  children: ReactNode;
  colorsArray: any[];
  sizing: {
    stripe: boolean | number | string;
    height: string | true;
    spacing: string | boolean;
  }
  opts: {
    position: 'left' | 'right' | any | any[];
    contain: boolean | string;
    border: boolean | string;
    gradientBorder: boolean | string;
    gradientBorderSize: string;
  }
}

export const GradientBox: FC<Props> = ({ colorsArray, children, sizing, opts }) => {

  let multi: boolean;

  let { stripe, height, spacing } = sizing;
  let { position, contain, border, gradientBorder, gradientBorderSize } = opts;

  spacing = checkType(spacing, "string") ? ' ' + spacing : spacing === false ? ' no-spacing' : '';
  border = border === true
      ? ' border'
    : border && checkType(border, 'string')
      ? ' '+border
    : border === false
      ? ' no-border'
      : '';

  if(colorsArray && checkType(colorsArray, 'arrays')) {
    multi = true;
  }

  contain = contain === true ? ' container' : '';
  stripe = stripe === true
      ? '5px'
    : stripe && checkType(stripe, 'number')
      ? `${stripe}px`
    : checkType(stripe, 'string')
      ? stripe
      : false;

  height = height === true
    ? '500px'
  : checkType(height, 'number')
    ? `${height}px`
  : checkType(height, 'string')
    ? height
  : contain !== ''
    ? '80vh'
    : '100vw';

  const setPosition = (pos: string | number) => {
    if(pos === 'left') {
      console.log('left')
      return "to left";
    }
    if(pos === 'right') {
      console.log('right')
      return "to right, ";
    }
    if(checkType(pos, 'number') && pos < 1 && pos > 0) {
      console.log('turn')
      return `${pos}turn,`;
    }
    if(checkType(pos, 'number') && pos >= 1) {
      console.log('deg')
      return `${pos}deg, `;
    }
    if(checkType(pos, 'string')) {
      return pos+', ';
    }

    // If all else fails return empty string...
    return '';
  }
  const colors = (colorsArray: string[]) => colorsArray
      ? colorsArray.join(', ')
      : '#e66465, #9198e5';

  const linerGradient = (deg: string, colors: string) => deg
    ? `linear-gradient(${deg}${colors})`
    : `linear-gradient(${colors})`;

  let linGrad = () => {
    let arr = [];
    if(multi === true) {
      for(let i=0; i < colorsArray.length; i++) {
        if(position[i] && checkType(position, 'array')) {
          arr.push(linerGradient(setPosition(position[i]),colors(colorsArray[i])))
        } else if(!position[i] && checkType(position[i], 'array')) {
          arr.push(linerGradient(setPosition(position[position.length - 1]),colors(colorsArray[i])))
        } else {
          arr.push(linerGradient(setPosition(position),colors(colorsArray[i])))
        }
      }
    }

    return arr.length ? arr.join(', ') : linerGradient(setPosition(position),colors(colorsArray));
  }

  const style = {
    backgroundImage: linGrad(),
    height: stripe ? stripe : height,
  }

  const gBoxRef = useRef(null);
  const gBorderRef = useRef(null);
  const gChildrenRef = useRef(null);
  const [gradientLoaded, setGradientLoaded] = useState(false);
  const [gBoxes, setGBoxes] = useState({
    box: <></>,
    border: <></>
  });

  const gradientBox =
    <div ref={gBoxRef} onClick={(e) => console.log(e)} className={"gradient-box"+border+contain} style={style}>
      { children ? <div className="gradient-box_children" ref={gChildrenRef}>
      { children }</div> : <></> }
    </div>

  // const gBoxHeight = gBoxRef ? gBoxRef.current.offsetHeight : '';
  // const gBoxWidth = gBoxRef ? gBoxRef.current.offsetWidth : '';

  function isValidSizeUnit(size: string): boolean {
    const sizeRegex = /(px|%|em|rem|vw|vh|vmin|vmax)$/;
    if(sizeRegex.test(size)) {
      return sizeRegex.test(size);
    } else {
      console.warn('Gradient Border Size must be a valid CSS unit for size. Size has been set to 2px.')
      return false;
    }
  }

  const gBorderSize = gradientBorder && isValidSizeUnit(gradientBorderSize)
    ? gradientBorderSize : '2px';
  const gBorderStyles = {
    border: gBorderSize+' solid',
    borderImage: linGrad(),
    height: gBoxRef.current !== null ? gBoxRef.current.offsetHeight : '',
    width: gBoxRef.current !== null ? gBoxRef.current.offsetWidth :  ''
  }
  // const gBorderStyles = null
    
  const gradientBorderBox = gradientBorder && gradientBorder !== true && checkType(gradientBorder, 'object')
      // ? <div ref={gBorderRef} className="gradient-box_border styled" style={gBorderStyles} />
    ? <div ref={gBorderRef} className="gradient-box_border styled" />
    : gradientBorder && gradientBorder === true
      ? <div ref={gBorderRef} className="gradient-box_border" />
      : <></>;

  useEffect(() => {
    if(gradientBox && gBoxRef.current) {
      // console.log(gBoxRef) 
      setGradientLoaded(true);
    }
    // console.log()
  }, [gradientLoaded]);

  return (
    <div className={"gradient-box_wrapper"+spacing}>
      { gradientBorderBox }
      { gradientBox }
    </div>
  )
}
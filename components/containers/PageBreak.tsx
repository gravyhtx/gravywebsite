import { CSSProperties, ReactNode } from 'react';
import styles from './styles/page-break.module.css';

interface Props {
  children: ReactNode;
  wrapperClasses?: string;
  border?: boolean;
  borderClasses?: string;
  borderStyles?: CSSProperties;
  shadow?: boolean;
  padding?: boolean;
}

const PageBreak = ({ children, wrapperClasses, border, borderClasses, borderStyles, shadow, padding }) => {

  // Add custom wrapper classes
  wrapperClasses = wrapperClasses ? styles.wrapper+' '+' '+wrapperClasses : styles.wrapper;

  // Add container classes
  const containerClasses =
    border && !borderClasses  // If border is true and no border classes, add default border to container
      ? styles.container + ' ' + styles.border
    : borderClasses && border // If border classes and border is true, add default border and custom classes to container
      ? styles.container + ' ' + styles.border + ' ' + borderClasses
    : borderClasses && !border // If border classes and no border is true, add custom container classes only
      ? styles.container + ' '  + borderClasses
      : styles.container;
  
  // Add style object to container
  let containerStyle = borderStyles ? borderStyles : null;

  // Remove padding from container
  const borderPadding = padding === false ? ' ' + styles.noPadding :  '';

  let shadowStyles = {
    boxShadow: '5px 5px 10px black',
    outline: '1px solid',
    outlineColor: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  }


  if(shadow === true) {
    containerStyle = {
      ...shadowStyles,
      ...containerStyle,
    }
  }

  return (<>
    <div className={wrapperClasses}>
      <div className={containerClasses+borderPadding} style={containerStyle}>
        {children}
      </div>
    </div>
  </>)
}

export default PageBreak;
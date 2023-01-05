

// SVG ICON

import Link from "next/link";

// Container for SVG icons
export const MaterializeIcon = ({ name, classes, link, target, description, onClick }) => {
  // Must have at least the name for this to work!
  name = name ? name : '';
  // Default 'target' to new tab ("_blank")
  target =
    target === 'self' || target === false ? '_self' :
    target === 'parent' ? '_parent' :
    '_blank';

  const mIcon = <i className={"material-icons icon-class"+classes} aria-label={description}>{name}</i>

  return (<>
    { link && !onClick
      ? <Link href={link} target={target}>
          <a className={classes} target={target}>
            { mIcon }
          </a></Link>
      : onClick
      ? <a className={classes} href="javascript:void(0);" onClick={onClick}>
          { mIcon }
        </a>
      : mIcon }
    </>
  )
}
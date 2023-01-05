import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { navlinks } from "../../config/theme";

interface Props {
  links: object[];
}

const TopNav: FC<Props> = ({ links }) => {
  links = links ? links : navlinks;
  const location = useRouter().pathname;

  return (
    <div className={"top-nav disable-highlight row"+(location === '/' ? ' home': '')} role="navigation" aria-label="Site Navigation" id="top-nav">
      {links.map((item: {link: string, alt: string, name: string, ref: any}, index: number) =>
          <Link href={item.link} aria-label={item.alt} key={index}>
            <div className="col s3">
                <span aria-label={item.name}
                  color="inherit"
                  className={"btn-floating navigation-link nav-"+item.name.toLowerCase()}
                >{item.ref ? <i className="material-icons nav-icon">{item.ref}</i> : item.alt}</span>
            </div>
          </Link>
      )}
    </div>
  );
  
}

export default TopNav;
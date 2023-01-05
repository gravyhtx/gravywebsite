import { FC } from "react";

import logo from '../../public/images/logos/gravy_rasta.svg';

interface Props {
  type: 'logo' | 'test' | undefined;
  image?: {
    logo?:
      | 'default'
      | 'rasta'
      | undefined

    }
}

const siteImage: FC<Props> = ({ type, image }) => {
  switch (type) {
    case 'logo':
      if(image.logo === 'default' || 'rasta') {
        return logo;
      }
  }
}

export default siteImage;
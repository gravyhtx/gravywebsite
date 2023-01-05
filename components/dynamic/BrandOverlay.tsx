import Image, { ImageProps, StaticImageData } from 'next/image';
import website from '../../config/site-data.json';
import styles from  './styles/BrandOverlay.module.css';

const BrandOverlay = (
  logo: StaticImageData,
  darkMode?: boolean | undefined,
) => {
  
  darkMode = darkMode === true ? true : false;
  const logoAlt = website.name ?  website.name +  " Site Logo" : "Site Logo";

  return (<>
    <div className={styles.brandOverlay + ' animate__animated animate__fadeIn'}>
      <div className={styles.overlayWrapper}>
        <div className={styles.container}>
          <Image src={logo}
            className={styles.logo}
            width={logo.width}
            height={logo.height}
            alt={logoAlt}
            sizes="100vw"
            placeholder="blur" />
        </div>
      </div>
    </div>
  </>)
}

export default BrandOverlay;
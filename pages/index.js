import { Fragment, useState } from 'react';
import Image from 'next/image';

import * as Unicons from '@iconscout/react-unicons';

import DefaultLayout from '../templates/DefaultLayout';

import Modal from '../components/dynamic/Modal';

import styles from './style/index.module.css';
import useWindowSize from '../hooks/useWindowSize';

export default function Home() {
// APP STATE
  const title = 'Home Page';
  // Set app
  const [sideNav, setSideNav] = useState(false);

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal)
  }

  const [popup, setPopup] = useState(false);
  const openPopup = () => {
    setPopup(!popup)
  }

  const winsize = useWindowSize();
  const width = winsize.width;
  const breakpoint = winsize.breakpoint;


  return (<>
    <div>Cool</div>
  </>)
}

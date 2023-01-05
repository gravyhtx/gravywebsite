import { FC } from "react";

// @ts-ignore
import test1 from '../public/content/test01.txt';

interface Props {
  type: 'page' | 'test' | undefined;
  content: {
    test?:
      | 'default'
      | number
    }
}

const siteContent: FC<Props> = ({ type, content }) => {
  switch (type) {
    case 'test':
      if(content.test === 'default' || content.test === 1) {
        return test1;
      }
  }
}

export default siteContent;
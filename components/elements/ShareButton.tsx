import { FC } from "react";
import { MiCon } from "./Icons";

interface Props {
  title: string;
  text: string;
  data: {
    url?: string;
    filesArray?: any[];
  }
  onSuccess?: () => any | boolean | undefined;
  onError?: (error?: any) => any | boolean | undefined;
}

const ShareButton: FC<Props> = ({
  title,
  text,
  data: { url, filesArray },
  onSuccess,
  onError
}) => {

  if(url && filesArray) {
    console.error(`Please send only a URL or File Array, not both.`)
  }

  const ifSuccess = () => {
    if(onSuccess() === true) {
      console.log('Share was successful.');
    }
    if(onSuccess()) {
      onSuccess();
    }
    return null;
  }
  const ifError = (error: any) => {
    if(onError() === true) {
      console.log('Sharing failed', error);
    }
    if(onError(error)) {
      onError(error);
    }
    return null;
  }

  const shareData = () => {
    if (navigator.canShare && ((filesArray && navigator.canShare({ files: filesArray })) || url)
    ) {
      navigator.share({
        files: filesArray ? filesArray : undefined,
        title: title,
        text: text,
        url: url ? url : undefined
      })
      .then(() => ifSuccess())
      .catch((error) => ifError(error));
    } else {
      console.log(`Your system doesn't support file sharing.`);
    }
  }


  return (<>
    <button onClick={() => shareData()}>
      <MiCon icon="ios_share" />
    </button>
  </>)
}

export default ShareButton;
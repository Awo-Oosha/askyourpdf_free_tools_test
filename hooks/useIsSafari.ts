import { useState, useEffect } from "react";

const useIsSafari = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const safariTest = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );
    setIsSafari(safariTest);
  }, []);

  return isSafari;
};

export default useIsSafari;

import { useState, useEffect } from "react";

const useDeviceDetection = () => {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const handleDeviceDetection = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };

    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return device;
};

export default useDeviceDetection;

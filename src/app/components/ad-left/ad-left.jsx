"use client";
import React, { useEffect } from 'react';
import "./ad-left.scss";


const AdLeft = () => {
    useEffect(() => {
    const loadYandexAds = () => {
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        window.Ya.Context.AdvManager.render({
          blockId: "R-A-16590718-2",
          renderTo: "yandex_rtb_R-A-16590718-2",
        });
      });
    };

    if (!document.getElementById("yandex-ads-script")) {
      const script = document.createElement("script");
      script.id = "yandex-ads-script";
      script.src = "https://yandex.ru/ads/system/context.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = loadYandexAds;
    } else {
      loadYandexAds();
    }
  }, []);
  return (
    <div className='add-left'>
        <div id="yandex_rtb_R-A-16590718-2"></div>
    </div>
  )
}

export default AdLeft
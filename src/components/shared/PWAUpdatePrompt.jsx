import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import "../../styles/pwaPrompt.css";

const PWAUpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW kayıtlı:", r);
    },
    onRegisterError(error) {
      console.error("SW hata:", error);
    },
  });

  const close = () => setNeedRefresh(false);

  if (!needRefresh) return null;

  return (
    <div className="pwa-prompt">
      <div className="pwa-prompt__content">
        <span className="pwa-prompt__icon">🔄</span>
        <div className="pwa-prompt__text">
          <strong>Güncelleme mevcut!</strong>
          <span>Yeni sürümü yüklemek ister misiniz?</span>
        </div>
      </div>
      <div className="pwa-prompt__actions">
        <button className="pwa-prompt__btn pwa-prompt__btn--cancel" onClick={close}>
          Sonra
        </button>
        <button
          className="pwa-prompt__btn pwa-prompt__btn--update"
          onClick={() => updateServiceWorker(true)}
        >
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function InstallationButton() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (event) => {
      event.preventDefault();
      setSupportsPWA(true);
      setDeferredPrompt(event); // No type casting needed in JavaScript
    };

    const detectAppInstallation = () => {
      window
        .matchMedia("(display-mode: standalone)")
        .addEventListener("change", (event) => {
          setIsAppInstalled(event.matches);
        });
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    detectAppInstallation();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("App installed successfully!");
        }
      });
    }
  };

  return (
    <Button
      variant="primary"
      className="pwa-install-button"
      disabled={!supportsPWA || isAppInstalled}
      onClick={installPWA}
    >
      Cài đặt
    </Button>
  );
}

export default InstallationButton;

import React from "react";
import { Button } from "react-bootstrap";

function InstallationButton() {
  function handleInstallClick() {
    const installPromptEvent = window.deferredPrompt;

    if (installPromptEvent) {
      installPromptEvent.prompt();

      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation prompt");
          // Optionally, track installation success
        } else {
          console.log("User dismissed the installation prompt");
          // Optionally, track installation failure
        }

        // Reset the deferredPrompt for future use
        window.deferredPrompt = null;
      });
    }
  }

  return (
    <Button variant="primary" onClick={handleInstallClick}>
      Cài đặt
    </Button>
  );
}

export default InstallationButton;

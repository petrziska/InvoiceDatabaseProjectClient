import React from "react";

/**
 * FlashMessage komponenta zobrazuje krátké upozornění nebo zprávu uživateli.
 * 
 */
export function FlashMessage({ theme, text }) {
  return <div className={"alert alert-" + theme}>{text}</div>;
}

export default FlashMessage;

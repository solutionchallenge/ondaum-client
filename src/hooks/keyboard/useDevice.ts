export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  typeof window !== "undefined" &&
  "MSStream" in window === false;

export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isAndroid = () => /Android/.test(navigator.userAgent);

export const getDynamicTop = (isKeyboardOpen: boolean): number => {
  if (typeof window === "undefined" || !isKeyboardOpen) return 0;

  const viewport = window.visualViewport;
  if (!viewport) return 0;

  const isIosSafari = isIOS() && isSafari();

  const fullHeight = isIosSafari
    ? Math.max(document.documentElement.clientHeight, window.innerHeight)
    : window.innerHeight;

  const viewportHeight = viewport.height;

  const keyboardHeight = fullHeight - viewportHeight - 64;
  console.log("[getDynamicTop]", {
    fullHeight,
    viewportHeight,
    keyboardHeight,
  });
  return keyboardHeight > 0 ? keyboardHeight : 0;
};

export const getDynamicContentHeight = (viewportHeight: number): string => {
  const headerHeight = 59;

  const iosSafariExtra = isIOS() && isSafari() ? 10 : 0;

  const finalHeight = viewportHeight - headerHeight - iosSafariExtra;
  console.log("finalheight:", finalHeight);
  return `${finalHeight}px`;
};

export const animationCreate = () => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("wowjs"); // side-effect: attaches WOW to window
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WOW = (window as any).WOW;
    if (typeof WOW === "function") {
      new WOW({ live: false }).init();
    }
  }
};

import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
interface Props {
    children: React.ReactNode;
}

const HeaderMenuPortal: FC<Props> = ({ children }) => {
  const mount = document.getElementById("header-menu-portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount?.appendChild(el);
    return () => {
        mount?.removeChild(el);
    }
  }, [el, mount]);

  return createPortal(children, el)
};

export default HeaderMenuPortal;
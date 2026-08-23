import { LuCheck, LuInfo, LuLoaderCircle, LuTriangleAlert, LuX } from "react-icons/lu";

export const iconsToastNormal = {
  success: <LuCheck />,
  warning: <LuTriangleAlert />,
  error: <LuX />,
  info: <LuInfo />,
};

export const iconsToastPromise = {
  pending: (
    <span className="toast-icon-promise">
      <LuLoaderCircle />
    </span>
  ),
  resolved: <LuCheck />,
  error: <LuX />,
};

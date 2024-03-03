import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to, onclick }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div onClick={onclick}>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}

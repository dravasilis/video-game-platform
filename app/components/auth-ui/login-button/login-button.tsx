import React from "react";
interface Props {
  onClick: () => void;
}
const LoginButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={() => onClick()}
      className="text-primary-150 text-sm w-max z-10 active:scale-95 duration-150 hover:bg-dark py-2 px-5 rounded-md hover:text-primary-300"
    >
      Sign in
    </button>
  );
};

export default LoginButton;

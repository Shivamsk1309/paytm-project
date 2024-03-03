import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const Signin = () => {
  return (
    <>
      <div className="bg-slate-400 h-screen flex justify-center">
        <div className=" flex flex-col justify-center ">
          <div className="rounded-lg bg-white w-80  p-2 h-max px-4">
            <Heading label={"Sign In"} />
            <SubHeading
              label={"Enter your credentials to login your account"}
            />
            <InputBox label={"Email"} placeholder={"youremail@example.com"} />
            <InputBox label={"Password"} placeholder={"*******"} />
            <div className="pt-4">
              <Button label={"Sign In   "} />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign Up"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

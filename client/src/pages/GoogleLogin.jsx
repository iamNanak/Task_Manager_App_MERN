import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleAuth } from "../../utils/googleApi";
import { login } from "../store/slice/authSlice";

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        // const { email, name } = result.data.user;
        const verifiedUser = result.data.user;
        const token = result.data.token;
        // console.log("teoken:", token);
        // const obj = { email, name, token };
        localStorage.setItem("authToken", token);
        // console.log("verified user:", verifiedUser);

        dispatch(login({ verifiedUser }));
        navigate("/dashboard");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: responseGoogle,
    onError: responseGoogle,
  });

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={googleLogin}
        className="border-2 w-full py-2 flex justify-center items-center "
      >
        Login With <FaGoogle className="ml-2" />
      </button>
    </div>
  );
}

export default GoogleLogin;

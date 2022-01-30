import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import users from "constants/api/users";

import { ReactComponent as LoginImages } from "assets/images/login-image.svg";

import { setAuthorizationHeader } from "configs/axios";

import { populateProfile } from "store/actions/users";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";

import Input from "components/Form/Input";

function LoginForm({ history }) {
  const dispatch = useDispatch();

  const [{ email, password }, setState] = useForm({
    email: "",
    password: "",
  });

  const [errors, seterrors] = useState(null);

  async function submit(e) {
    e.preventDefault();

    users
      .login({ email, password })
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        users.details().then((detail) => {
          dispatch(populateProfile(detail.data));
          const production =
            process.env.REACT_APP_FRONTPAGE_URL ===
            "https://sidepresi.rsjhbsaanin.com"
              ? "Domain = https://sidepresi.rsjhbsaanin.com"
              : "";
          localStorage.setItem(
            "SIDEPRESI:token",
            JSON.stringify({
              ...res.data,
              email: email,
            })
          );

          const redirect = localStorage.getItem("SIDEPRESI:redirect");
          const userCookie = {
            name: detail.data.name,
            thumbnail: detail.data.avatar,
          };

          const expires = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          );

          document.cookie = `SIDEPRESI:user=${JSON.stringify(
            userCookie
          )};expires=${expires.toUTCString()}; path:/; ${production}`;

          history.push(redirect || "/");
        });
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
      });
  }

  const ERRORS = fieldErrors(errors);

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-full sm:w-3/12">
        <h1 className="text-4xl text-orange-500 mb-6">
          <span className="font-bold">Login </span>
          Dashboard
          <br />
          <span className="text-green-800 font-bold"> SiDepresi </span>
        </h1>
        <form onSubmit={submit}>
          <Input
            value={email}
            error={ERRORS?.email?.message}
            name="email"
            type="email"
            onChange={setState}
            placeholder="Masukan alamat email"
            labelName="Email"
          />
          <Input
            value={password}
            error={ERRORS?.password?.message}
            name="password"
            type="password"
            onChange={setState}
            placeholder="Masukan kata sandi"
            labelName="Kata Sandi"
          />
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-1 w-full"
          >
            Masuk
          </button>
        </form>
      </div>
      <div className="w-1/12 hidden sm:block"></div>
      <div className="w-5/12 hidden sm:block justify-end pt-24 pr-0 pl-20">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div className="absolute w-full h-full -mb-8 -ml-2">
            <div className="absolute w-full h-full -mb-8 -ml-2">
              <LoginImages></LoginImages>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);

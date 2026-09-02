import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import users from "constants/api/users";
import { ReactComponent as LoginImages } from "assets/images/login-image.svg";
import { setAuthorizationHeader } from "configs/axios";
import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";
import Input from "components/Form/Input";
import { MailIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/solid";

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
    <div className="min-h-screen py-8 px-4 sm:px-6 flex justify-center items-center">
      <div className="w-full max-w-4xl my-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ===== FORM CARD ===== */}
        <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800 p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20 mb-3">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-300" />
                <span>Portal Petugas</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Masuk ke SiDepresi
              </h1>
              <p className="text-emerald-100 text-sm mt-1.5">
                Sistem Pendaftaran & Layanan Antrean Pasien
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={submit} className="space-y-4">
              <Input
                value={email}
                error={ERRORS?.email?.message}
                name="email"
                type="email"
                onChange={setState}
                placeholder="nama@email.com"
                labelName="Alamat Email"
                icon={MailIcon}
                isRequired={true}
              />
              <Input
                value={password}
                error={ERRORS?.password?.message}
                name="password"
                type="password"
                onChange={setState}
                placeholder="••••••••"
                labelName="Kata Sandi"
                icon={LockClosedIcon}
                isRequired={true}
              />

              <button
                type="submit"
                className="w-full h-12 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/25 transition-all duration-150 cursor-pointer mt-2"
              >
                Masuk Sekarang
              </button>
            </form>
          </div>
        </div>

        {/* ===== ILLUSTRATION ===== */}
        <div className="lg:col-span-6 hidden lg:flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-8 text-center">
          <div className="w-full max-w-[280px] mb-6 p-4">
            <LoginImages className="w-full h-auto" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Sistem Informasi Rawat Jalan
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Kelola antrean dan administrasi pendaftaran pasien RS Jiwa Prof. HB Saanin Padang secara terintegrasi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);

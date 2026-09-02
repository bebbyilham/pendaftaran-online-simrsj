import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import users from "constants/api/users";
import { ReactComponent as RegisterImages } from "assets/images/register-image.svg";
import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";
import Select from "components/Form/Select";
import Input from "components/Form/Input";
import {
  UserIcon,
  MailIcon,
  LockClosedIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
} from "@heroicons/react/solid";

function RegisterForm({ history }) {
  const [{ name, email, password, profession, otherProfession }, setState] =
    useForm({
      name: "",
      email: "",
      password: "",
      profession: "",
      otherProfession: "",
    });

  const [errors, seterrors] = useState(null);

  async function submit(e) {
    e.preventDefault();

    users
      .register({
        name,
        email,
        password,
        profession: profession === "others" ? otherProfession : profession,
      })
      .then((res) => {
        history.push("/login");
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
                <span>Pendaftaran Akun</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Registrasi Petugas Baru
              </h1>
              <p className="text-emerald-100 text-sm mt-1.5">
                Buat akun petugas sistem SIMRSJ SiDepresi
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={submit} className="space-y-4">
              <Input
                value={name}
                error={ERRORS?.name?.message}
                name="name"
                onChange={setState}
                placeholder="Nama lengkap petugas"
                labelName="Nama Lengkap"
                icon={UserIcon}
                isRequired={true}
              />
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

              <Select
                labelName="Profesi / Jabatan"
                name="profession"
                value={profession}
                fallbackText="-- Pilih Profesi --"
                icon={BriefcaseIcon}
                onClick={setState}
                isRequired={true}
              >
                <option value="Perawat">Perawat</option>
                <option value="Dokter">Dokter</option>
                <option value="Petugas Loket">Petugas Loket</option>
                <option value="others">Lainnya</option>
              </Select>

              {profession === "others" && (
                <Input
                  value={otherProfession}
                  error={ERRORS?.otherProfession?.message}
                  name="otherProfession"
                  type="text"
                  onChange={setState}
                  placeholder="Tuliskan nama profesi Anda"
                  labelName="Nama Profesi Lainnya"
                  icon={BriefcaseIcon}
                />
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/25 transition-all duration-150 cursor-pointer mt-2"
              >
                Daftar Akun Baru
              </button>
            </form>
          </div>
        </div>

        {/* ===== ILLUSTRATION ===== */}
        <div className="lg:col-span-6 hidden lg:flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-8 text-center">
          <div className="w-full max-w-[280px] mb-6 p-4">
            <RegisterImages className="w-full h-auto" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Bergabung dengan SiDepresi
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Akses aman ke sistem pendaftaran dan layanan antrean rawat jalan RS Jiwa Prof. HB Saanin Padang.
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterForm);

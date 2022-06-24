import React from "react";
// import Sumbar from "assets/images/logo-sumbar.svg";
// import Hbs from "assets/images/logo-hbs.svg";

export default function Partners() {
  return (
    <>
      {/* <div className="flex flex-wrap justify-center items-center">
        <div className="w-full sm:w-1/6 mb-8 md:mb-0">Syarat & Ketentuan</div>
        <div className="w-full sm:w-1/6 mb-8 md:mb-0">TEST</div>
      </div> */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl leading-6 font-semibold text-gray-900">
            Syarat & Ketentuan
          </h2>
          <p className="mt-1 max-w-2xl text-xl text-gray-500">
            Pendaftaran Online Rawat Jalan
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* <dt className="text-sm font-medium text-gray-500">
                Pendaftaran Online hanya bisa dilakukan dari H-3 hingga H-1 dari
                tanggal rencana kunjungan.
              </dt> */}
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <b>
                  * Untuk Pasien baru silahkan mendaftar ke loket pendaftaran
                  (on site)
                </b>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* <dt className="text-sm font-medium text-gray-500">
                Pendaftaran Online hanya bisa dilakukan dari H-3 hingga H-1 dari
                tanggal rencana kunjungan.
              </dt> */}
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                Pendaftaran online dapat digunakan oleh peserta yang memiliki{" "}
                <b>Nomor Rekam Medis</b>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* <dt className="text-sm font-medium text-gray-500">
                Pendaftaran Online hanya bisa dilakukan dari H-3 hingga H-1 dari
                tanggal rencana kunjungan.
              </dt> */}
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                Pendaftaran Online hanya bisa dilakukan dari H-5 hingga H-1 dari
                tanggal rencana kunjungan.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* <dt className="text-sm font-medium text-gray-500">
                Application for
              </dt> */}
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                Nomor pendaftaran Online Wajib di Unduh dan di lihatkan ke
                petugas pada saat hari kunjungan.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt> */}
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                Pada hari H kunjungan, Pasien yang telah mendapatkan nomor
                antrian diwajibkan melapor ke bagian pendaftaran/informasi
                terlebih dahulu untuk pengecekan kelengkapan berkas dan
                verifikasi nomor antrian.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* <dt className="text-sm font-medium text-gray-500">
                Salary expectation
              </dt> */}
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                Bagi Pasien yang belum hadir saat panggilan pelayanan di anggap
                batal berkunjung dan harus mendaftar kembali ke loket
                pendaftaran/informasi.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-xl font-semibold text-gray-900">
                Kelengkapan Berkas
              </dt>
              {/* <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd> */}
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-900">Pasien Umum</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KTP ASLI yang masih berlaku atau
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KARTU KELUARGA (KK) ASLI bagi pasien anak dan
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KARTU BEROBAT ASLI (Bagi Pasien Ulangan)
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-900">Pasien BPJS</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        SURAT KONTROL / SURAT RUJUKAN ASLI dari Klinik /
                        Puskesmas (Faskes 1)
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KARTU BPJS ASLI
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KTP ASLI yang masih berlaku
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KARTU KELUARGA ASLI (KK) bagi pasien anak dan
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {/* <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                      <span className="ml-2 flex-1 w-0 truncate">
                        KARTU BEROBAT ASLI (Bagi Pasien Ulangan)
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0"></div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

export default function Modal(props) {
  //state local
  const [Ready, setReady] = useState(() => false);
  const [Display, setDisplay] = useState(() => false);
  const [Allow, setAllow] = useState(() => true);

  const ModalRef = useRef(null);
  const idModal = "modal";
  const modalOpen = "modal-open";

  //setup function toggle allow
  function toggleAllow() {
    setAllow(!Allow);
  }

  //function toggle pengecekan (on/off)
  function toggle() {
    if (props.toggleModal) props.toggleModal();
    else setDisplay(!Display);
  }

  //function utk capture ketika diclick di luar
  function handleClickOutside(event) {
    if (
      ModalRef?.current &&
      !ModalRef?.current?.contains?.(event.target) &&
      Allow
    )
      toggle();
  }

  //capture event dari document
  //useEffect 1
  useEffect(() => {
    const rootContainer = document.createElement("div");
    rootContainer.setAttribute("id", idModal);
    setReady(true);

    //cek misalkan document tidak punya getElementById(idModal)
    //maka munculkan rootContainer
    if (!document.getElementById(idModal))
      document.body.appendChild(rootContainer);
  }, []);

  //useEffect 2
  //capture event
  useEffect(() => {
    //ketika di click maka jalankan handleClickOutside
    document.addEventListener("mousedown", handleClickOutside);

    //ketika keluar dari modal maka remove function diatas
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //useEffect 3
  //akan mejalankan
  useEffect(() => {
    //jika value display atau props.in(cek muncul atau tidak)
    if (Display || props.in) {
      document.querySelector("body").classList.add(modalOpen);
    }
    //jika keluar dari komponen modal maka modal-open di remove(buang)
    return () => {
      document.querySelector("body").classList.remove(modalOpen);
    };
  }, [Display, props.in]);

  //jika cek komponen react siap atau belum
  if (!Ready) return null;
  //jika siap
  return (
    <>
      {props.children(toggle)}
      {document && document.getElementById(idModal) && (
        <div>
          {createPortal(
            <CSSTransition
              in={props.in ?? Display}
              timeout={500}
              onExit={toggleAllow}
              onExited={toggleAllow}
              classNames="overlay"
              unmountOnExit
            >
              <div className="overlay fixed inset-0 h-screen z-50">
                <div className="bg-black opacity-25 inset-0 absolute z-10"></div>
                <div className="absolute z-20 flex items-center justify-center inset-0">
                  <div
                    style={props.modalStyle}
                    ref={ModalRef}
                    className="bg-white shadow-2xl max-w-3xl max-h-2xl"
                  >
                    <div className="relative">
                      <span className="modal-close" onClick={toggle}></span>
                    </div>

                    {props.content(toggle)}
                  </div>
                </div>
              </div>
            </CSSTransition>,
            document.getElementById(idModal)
          )}
        </div>
      )}
    </>
  );
}

Modal.defaultProps = {};
Modal.propTypes = {
  in: propTypes.bool,
  toggleModal: propTypes.func,
  content: propTypes.func.isRequired,
};

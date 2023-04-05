import React, { useState, useEffect } from "react";

type ModalType = {
  title?: string;
  body?: string;
  onClose?: (data?: any) => void;
  onOk?: (data?: any) => void;
  visibility?: "close" | "open";
};

export default function Modal({
  title,
  body,
  onClose,
  onOk,
  visibility,
}: ModalType) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  }

  function handleOk() {
    setIsOpen(false);
    if (onOk) {
      onOk();
    }
  }

  useEffect(() => {
    switch (visibility) {
      case "close":
        setIsOpen(false);
        break;

      case "open":
        setIsOpen(true);
        break;

      default:
        break;
    }

  }, [visibility]);

  return (
    <>
      {/* <button
        className="px-4 py-2 rounded-full bg-blue-500 text-white"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button> */}
      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed w-full h-full top-0 left-0 flex items-center justify-center transition-opacity duration-500`}
      >
        <div
          className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
          onClick={handleClose}
        ></div>

        <div
          className={`${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto transition-opacity duration-500 transition-transform`}
        >
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">{title}</p>
              <button
                className="modal-close cursor-pointer z-50"
                onClick={handleClose}
              >
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M1.5 16.5l15-15M16.5 16.5l-15-15"></path>
                </svg>
              </button>
            </div>
            <div className="modal-body" id="form_modal">{body}</div>
            <div className="flex justify-end pt-2">
              {/* <button
                className="px-4 bg-transparent p-3 rounded-lg text-blue-500 hover:bg-gray-100 hover:text-blue-400 mr-2"
                onClick={handleOk}
              >
                OK
              </button> */}
              {/* <button
                className="modal-close px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                onClick={handleClose}
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

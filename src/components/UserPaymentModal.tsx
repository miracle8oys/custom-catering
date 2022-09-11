import { useState } from "react";
import { db, getDoc, doc } from "../utility/database";

interface PaymentModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPic: React.Dispatch<React.SetStateAction<FileList | null>>;
  handleUploadTransfer: (channel: string) => Promise<void>;
  deficit: number;
}

interface PaymentInfo {
  name: string;
  no: string;
  img: string;
  id: string;
}

export default function UserPaymentModal({
  showModal,
  setShowModal,
  setPic,
  handleUploadTransfer,
  deficit,
}: PaymentModalProps) {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>();

  const handlePaymentInfo = (paymentId: string) => {
    const paymentInfoRef = doc(db, "PaymentInfo", paymentId);
    getDoc(paymentInfoRef).then((res) => {
      if (res.exists()) {
        setPaymentInfo({
          name: res.data().name,
          img: res.data().img,
          no: res.data().no,
          id: res.id,
        });
      }
    });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-[50vw]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 dark:text-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="flex justify-evenly">
                  <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <input
                      onClick={() => handlePaymentInfo("BCA")}
                      id="bordered-radio-1"
                      type="radio"
                      value=""
                      name="bordered-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-1"
                      className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      BCA
                    </label>
                  </div>
                  <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <input
                      onClick={() => handlePaymentInfo("BNI")}
                      id="bordered-radio-2"
                      type="radio"
                      value=""
                      name="bordered-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      BNI
                    </label>
                  </div>
                  <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <input
                      onClick={() => handlePaymentInfo("BRI")}
                      id="bordered-radio-2"
                      type="radio"
                      value=""
                      name="bordered-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      BRI
                    </label>
                  </div>
                </div>

                {paymentInfo && (
                  <div className=" text-black dark:text-white md:min-w-min min-w-[95vw]">
                    <div className=" mx-3 px-3">
                      <div className="flex justify-center">
                        <img
                          className="w-64 h-20"
                          src={paymentInfo.img}
                          alt="bank"
                        />
                      </div>
                      <div className="flex justify-between mt-3">
                        <p>name: </p>
                        <p className="text-center">{paymentInfo.name}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Account Number: </p>
                        <p className="text-center">{paymentInfo.no}</p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p>Total: </p>
                        <p className="text-center">Rp. {deficit}</p>
                      </div>

                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="file_input"
                      >
                        Upload Transfer Evidence
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) => setPic(e.target.files)}
                      />
                    </div>
                  </div>
                )}

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (paymentInfo) {
                        setShowModal(false);
                        handleUploadTransfer(paymentInfo.id);
                      }
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

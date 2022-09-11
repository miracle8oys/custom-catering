import { useState } from "react";
import { setDoc, doc, db } from "../utility/database";
import { useUserContext } from "../utility/userCredential";
import { useNavigate } from "react-router-dom";

function UserCredential() {
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { uid, email, displayName } = useUserContext();
  const navigate = useNavigate();

  const handleSubmitUser = () => {
    setDoc(doc(db, "Carts", uid), {
      address,
      phone,
      email,
      displayName,
      items: [],
    })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <section className=" bg-slate-50 h-screen text-black">
      <div className="w-full lg:w-6/12 px-4 mx-auto pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0 my-10 py-7">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blueGray-500 text-sm font-bold">
                User Credential
              </h6>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Address
                </label>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                ></textarea>
              </div>

              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Phone
                </label>
                <input
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={handleSubmitUser}
                  className="bg-slate-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserCredential;

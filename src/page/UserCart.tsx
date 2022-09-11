import {
  doc,
  db,
  getDoc,
  updateDoc,
  Timestamp,
  collection,
  addDoc,
} from "../utility/database";
import { ref, uploadBytes, getDownloadURL, storage } from "../utility/storage";
import { CartInterface, SubCartInterface } from "../utility/dataInterface";
import { useEffect, useState } from "react";
import { useUserContext } from "../utility/userCredential";
import CartList from "../components/CartList";
import Loading from "../components/Loading";
import UserPaymentModal from "../components/UserPaymentModal";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

interface CartAttributes {
  totalAmount: number;
  deficit: number;
  unpaidOrder: number;
}

export default function UserCart() {
  const { uid } = useUserContext();
  const [cart, setCart] = useState<CartInterface | null>(null);
  const [cartAttributes, setCartAttributes] = useState<CartAttributes | null>(
    null
  );
  const [changes, setChanges] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [pic, setPic] = useState<FileList | null>(null);

  useEffect(() => {
    if (uid) {
      const cartRef = doc(db, "Carts", uid);
      getDoc(cartRef).then((cartData) => {
        if (cartData.exists()) {
          setCart({
            uid: cartData.data().id,
            address: cartData.data().address,
            phone: cartData.data().phone,
            name: cartData.data().displayName,
            email: cartData.data().email,
            items: [...cartData.data().items],
          });

          countTotal(cartData.data().items);
          setIsLoading(false);
        }
      });
    }
  }, [uid, changes]);

  const countTotal = (items: Array<SubCartInterface>) => {
    let netTotal = 0;
    let deficit = 0;
    let unpaidOrder = 0;
    items.forEach((item: SubCartInterface) => {
      netTotal += item.subTotal;
      if (item.status === 0) {
        deficit += item.subTotal;
        unpaidOrder += 1;
      }
    });

    setCartAttributes({
      totalAmount: netTotal,
      deficit: deficit,
      unpaidOrder: unpaidOrder,
    });
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm("Delete Item?") === true) {
      const filterItem = cart?.items.filter((item) => item.id !== id);

      const cartRef = doc(db, "Carts", uid);
      updateDoc(cartRef, {
        items: filterItem,
      })
        .then(() => {
          alert("Delete Item Success");
          setChanges((current) => current + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePromoCode = () => {
    setPromoMessage(false);
    setTimeout(() => {
      setPromoMessage(true);
    }, 1000);
  };

  const handleUploadTransfer = async (channel: string) => {
    const imgUrl = await handleStorageUpload();
    await addDoc(collection(db, "Transfer"), {
      img: imgUrl,
      createdAt: Timestamp.now(),
      uid,
      deficit: cartAttributes?.deficit,
      channel,
      name: cart?.name,
      phone: cart?.phone,
    })
      .then(() => {
        setShowModal(false);
        setPic(null);
      })
      .catch((err) => console.log(err));
  };

  const handleStorageUpload = async () => {
    const storegaRef = ref(storage, "Transfer/" + Date.now().toString());
    if (pic) {
      return uploadBytes(storegaRef, pic[0]).then(async (snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => url);
      });
    }

    throw new Error("Image Undefine");
  };

  return (
    <>
      <UserNavbar />
      <div className="bg-gray-100 text-black dark:bg-gray-600 dark:text-white">
        <div className="container mx-auto md:mt-10 mt-3">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="md:flex shadow-md md:py-10 py-3">
              <div className="md:w-3/4 bg-white dark:bg-slate-700 dark:text-white md:px-10 md:py-10 px-10 py-3 overflow-auto">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">
                    {cart?.items.length} Items
                  </h2>
                </div>
                <div className="flex mt-10 pb-5 md:w-full w-max text-gray-600 dark:text-gray-200">
                  <h3 className="font-semibold  text-xs uppercase w-52 text-center">
                    Product
                  </h3>
                  <h3 className="font-semibold  text-xs uppercase w-72  text-center">
                    Schedule
                  </h3>
                  <h3 className="font-semibold  text-xs uppercase w-48 text-center">
                    Price
                  </h3>
                  <h3 className="font-semibold  text-xs uppercase w-48 text-center">
                    Subtotal
                  </h3>
                  <h3 className="font-semibold text-xs uppercase w-48 text-center">
                    Status
                  </h3>
                </div>
                {cart?.items.map((item) => (
                  <CartList
                    handleRemoveItem={handleRemoveItem}
                    item={item}
                    key={item.id}
                  />
                ))}

                <div className="flex items-center justify-evenly md:w-full w-max gap-7">
                  <Link
                    to="/"
                    className="flex font-semibold items-center gap-1 text-indigo-600 text-sm mt-10"
                  >
                    <BsArrowLeft className="text-xl" />
                    Continue Shopping
                  </Link>

                  <Link
                    to="/transfer"
                    className="flex font-semibold items-center gap-1 text-indigo-600 text-sm mt-10"
                  >
                    Payment History
                    <BsArrowRight className="text-xl" />
                  </Link>
                </div>
              </div>

              <div id="summary" className="md:w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Orders: {cart?.items.length}
                  </span>
                  <span className="font-semibold text-sm">
                    Rp. {cartAttributes?.totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between mt-3 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Unpaid: {cartAttributes?.unpaidOrder}
                  </span>
                  <span className="font-semibold text-sm">
                    Rp. {cartAttributes?.deficit.toLocaleString("id-ID")}
                  </span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>{cart?.address}</option>
                  </select>
                </div>
                <div className="pt-10 pb-5">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm w-full"
                  />
                </div>
                <div className="pb-3 text-sm text-orange-500">
                  {promoMessage && <p>Code Doesn't Exist</p>}
                </div>
                <button
                  onClick={handlePromoCode}
                  className="bg-red-500 rounded hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
                >
                  Apply
                </button>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-md capitalize">
                    <span>Total cost</span>
                    <span>
                      Rp. {cartAttributes?.deficit.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          <UserPaymentModal
            showModal={showModal}
            setShowModal={setShowModal}
            setPic={setPic}
            handleUploadTransfer={handleUploadTransfer}
            deficit={cartAttributes?.deficit || 0}
          />
        </div>
      </div>
    </>
  );
}

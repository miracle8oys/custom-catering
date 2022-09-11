import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DayPicker from "../components/DayPicker";
import { doc, db, getDoc, updateDoc, Timestamp } from "../utility/database";
import { ItemInterface } from "../utility/dataInterface";
import { useUserContext } from "../utility/userCredential";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { FaPlus } from "react-icons/fa";
import UserNavbar from "../components/UserNavbar";

function DetailProduct() {
  const { itemId } = useParams();
  const [item, setItem] = useState<ItemInterface | null>(null);
  const [dayChoice, setDayChoice] = useState<number[]>([]);
  const [durations, setDurations] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const { uid } = useUserContext();

  useEffect(() => {
    if (itemId) {
      const itemRef = doc(db, "Items", itemId);

      getDoc(itemRef).then((itemData) => {
        if (itemData.exists()) {
          setItem({
            id: itemData.id,
            name: itemData.data().name,
            desc: itemData.data().desc,
            available: itemData.data().available,
            price: itemData.data().price,
            category: itemData.data().category,
            createdAt: itemData.data().createdAt,
            pic: itemData.data().pic,
          });
          setIsLoading(false);
        }
      });
    }
  }, [itemId]);

  const handleAddToCart = () => {
    if (!uid) {
      alert("User Undefine, Please Login!");
      return false;
    }
    if (item && dayChoice.length > 0) {
      const cartRef = doc(db, "Carts", uid);
      getDoc(cartRef).then((cartData) => {
        if (cartData.exists()) {
          //javascript array cntain
          const cartItems = cartData
            .data()
            .items.some((i: ItemInterface) => i.id === item.id);

          if (!cartItems) {
            const currentItems = cartData.data().items;

            const subTotal = item?.price * dayChoice.length * durations;

            updateDoc(cartRef, {
              items: [
                ...currentItems,
                {
                  ...item,
                  subTotal,
                  durations,
                  schedule: dayChoice,
                  status: 0,
                  createdAt: Timestamp.now(),
                  note: "",
                },
              ],
            })
              .then(() => navigate("/cart"))
              .catch((err) => console.log(err));
          } else {
            alert("Item Aredy In the User Cart");
          }
        } else {
          navigate("/register/credential");
        }
      });
    } else {
      alert("Please Choice Delivery Schedule");
    }
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-slate-200 min-h-screen rounded-md dark:text-white dark:bg-slate-600">
      <UserNavbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container px-5 md:py-12 py-3 mx-auto">
          <div className="text-3xl hover:text-5xl hover:text-yellow-300 mb-3 h-7">
            <MdKeyboardBackspace onClick={() => navigate(-1)} />
          </div>
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-2/5 w-full object-cover object-center rounded border border-gray-200"
              src={item?.pic}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="flex gap-3">
                {item?.category.map((value) => (
                  <a
                    key={value}
                    className="text-sm title-font text-green-500 capitalize tracking-widest"
                    href={`/category/${value}`}
                  >
                    <h5>{value}</h5>
                  </a>
                ))}
              </div>
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                {item?.name}
              </h1>

              <p className="leading-relaxed">{item?.desc}</p>

              <DayPicker
                setDayChoice={setDayChoice}
                dayChoice={dayChoice}
                durations={durations}
                setDurations={setDurations}
              />

              <div className="flex pb-7">
                <span className="title-font font-medium md:text-2xl text-lg text-gray-900 dark:text-white">
                  Rp. {item?.price.toLocaleString("id-ID")}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="flex font-semibold items-center gap-2 ml-auto text-white bg-red-500 border-0 md:py-2 md:px-6 px-2 focus:outline-none hover:bg-red-600 rounded"
                >
                  <FaPlus /> Add To Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailProduct;

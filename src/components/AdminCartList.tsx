import { useState } from "react";
import { CartInterface, SubCartInterface } from "../utility/dataInterface";
import { updateDoc, doc, db } from "../utility/database";
import CartModal from "./CartModal";

interface AdminCartListProps {
  item: CartInterface;
  index: number;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

function AdminCartList({ item, index, setChanges }: AdminCartListProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const completeItemCount = (item: SubCartInterface[]) => {
    let count = 0;
    let deficit = 0;

    item.forEach((i) => {
      if (i.status !== 0) {
        count += 1;
      } else {
        deficit += i.subTotal;
      }
    });

    return { count, deficit };
  };

  const handleConfirmOrder = (productId: string, status: number) => {
    const cartItemsUpdate = item.items.map((item) => {
      if (item.id === productId) {
        return { ...item, status };
      } else {
        return item;
      }
    });

    const CartRef = doc(db, "Carts", item.uid);
    updateDoc(CartRef, {
      items: cartItemsUpdate,
    })
      .then(() => {
        setChanges((current) => current + 1);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr className="bg-slate-400 border-b text-center">
      <td className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap w-16">
        {index + 1}
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap  w-64">
        {item.name}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {item.address}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {item.phone}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {item.email}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {completeItemCount(item.items).count}/{item.items.length}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {completeItemCount(item.items).deficit}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        <CartModal
          cart={item}
          showModal={showModal}
          setShowModal={setShowModal}
          handleConfirmOrder={handleConfirmOrder}
        />
      </td>
    </tr>
  );
}

export default AdminCartList;

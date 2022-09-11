import { useState } from "react";
import { TransferInterface } from "../utility/dataInterface";
import PopupIMGModal from "./PopupIMGModal";

interface AdminTransferListProps {
  item: TransferInterface;
  index: number;
}

function AdminTransferList({ item, index }: AdminTransferListProps) {
  const dateFormat = (date: number) => {
    return new Date(date * 1000);
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <tr className="bg-slate-400 border-b text-center">
        <td className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap w-32">
          {index + 1}
        </td>
        <td className="py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap  w-64">
          {item.name}
        </td>
        <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
          {item.channel}
        </td>
        <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
          {item.phone}
        </td>
        <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
          {item.deficit}
        </td>
        <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
          {dateFormat(item.createdAt.seconds).toDateString()}
        </td>
        <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64 flex justify-center">
          <img
            onClick={() => setShowModal(true)}
            className="w-24 h-20 object-cover"
            src={item.img}
            alt="transfer"
          />
        </td>
        <td>
          <PopupIMGModal
            showModal={showModal}
            setShowModal={setShowModal}
            imgUrl={item.img}
            title={`${item.name} / ${item.uid}`}
          />
        </td>
      </tr>
    </>
  );
}

export default AdminTransferList;

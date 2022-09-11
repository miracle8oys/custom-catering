import { SubCartInterface } from "../utility/dataInterface";
import ScheduleDisplay from "../components/ScheduleDisplay";

interface CartListProps {
  item: SubCartInterface;
  handleRemoveItem?: (id: string) => void;
  handleConfirmOrder?: (productId: string, status: number) => void;
}

function CartList({
  item,
  handleRemoveItem,
  handleConfirmOrder,
}: CartListProps) {
  return (
    <div className="flex mt-10 mb-5 md:w-full w-max items-center">
      <div className="flex w-52">
        <div className="w-32">
          <img
            className="h-24 w-24 object-cover"
            src={item.pic}
            alt="preview"
          />
        </div>
        <div className="flex flex-col justify-between ml-4 my-5 flex-grow md:w-32">
          <span className="font-bold text-md w-12">{item.name}</span>
          <span className="text-red-500 text-xs">{item.durations} weeks</span>
          {handleRemoveItem && (
            <span
              onClick={() => handleRemoveItem(item.id)}
              className="font-semibold hover:text-red-700 cursor-pointer text-gray-500 text-sm"
            >
              Remove
            </span>
          )}
        </div>
      </div>

      <div className="w-72">
        <ScheduleDisplay schedule={item.schedule} />
      </div>

      <div className="text-center  w-48 md:px-12 font-semibold text-sm">
        Rp. {item.price.toLocaleString("id-ID")}
      </div>
      <div className="text-center w-48 md:px-12 font-semibold text-sm">
        Rp. {item.subTotal.toLocaleString("id-ID")}
      </div>
      <div className="text-center w-48 md:px-12 font-semibold text-sm">
        {item.status === 0 ? (
          <p>
            Payment <br /> Waiting
          </p>
        ) : (
          <p>On Process</p>
        )}
      </div>
      {handleConfirmOrder && (
        <>
          {item.status === 0 ? (
            <button
              onClick={() => handleConfirmOrder(item.id, 1)}
              className="bg-blue-500 py-3 w-20 rounded hover:bg-blue-300"
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={() => handleConfirmOrder(item.id, 0)}
              className="bg-red-500 py-3 w-20 rounded hover:bg-red-300"
            >
              Cancel
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default CartList;

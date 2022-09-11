import { ItemInterface } from "../utility/dataInterface";
import { storage, ref, deleteObject } from "../utility/storage";
import { db, doc, deleteDoc } from "../utility/database";

interface AdminProductListProps {
  item: ItemInterface;
  index: number;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

function AdminProductList({ item, index, setChanges }: AdminProductListProps) {
  const handleDeleteItem = () => {
    handleDeleteImage();

    deleteDoc(doc(db, "Items", item.id))
      .then(() => setChanges((current) => current + 1))
      .catch((err) => console.log(err));
  };

  const handleDeleteImage = () => {
    if (
      item.pic !==
      "https://firebasestorage.googleapis.com/v0/b/bali-catering.appspot.com/o/IMG%2Fdefault.jpg?alt=media&token=514c449b-4e6a-4bb1-9332-02fa0d9f66eb"
    ) {
      const imgID = item.createdAt.seconds;
      const storageRef = ref(storage, "IMG/" + imgID);

      deleteObject(storageRef)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <tr className="bg-slate-400 border-b text-center">
      <td className="py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap w-16">
        {index + 1}
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap w-64">
        <img className="object-cover w-32 h-20" src={item.pic} alt="preview" />
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap  w-64">
        {item.name}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {item.price}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 w-96">{item.desc}</td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        {item.available ? <p>Available</p> : <p>Unavailable</p>}
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 whitespace-nowrap w-64">
        <div onClick={handleDeleteItem} className="flex gap-3">
          <button className="text-button bg-red-500 rounded px-3 py-2 hover:px-4 hover:py-3 hover:bg-red-300 font-semibold text-md">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AdminProductList;

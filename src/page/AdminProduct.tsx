import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { ItemInterface } from "../utility/dataInterface";
import { collection, query, db, getDocs, where } from "../utility/database";
import Loading from "../components/Loading";
import AdminProductList from "../components/AdminProductList";
import AdminNavbar from "../components/AdminNavbar";

function AdminProduct() {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [changes, setChanges] = useState<number>(0);

  useEffect(() => {
    const itemsDoc = query(
      collection(db, "Items"),
      where("available", "==", true)
    );
    getDocs(itemsDoc).then((res) => {
      setItems(
        res.docs.map((value) => ({
          id: value.id,
          name: value.data().name,
          desc: value.data().desc,
          available: value.data().available,
          createdAt: value.data().createdAt,
          pic: value.data().pic,
          price: value.data().price,
          category: value.data().category,
        }))
      );
      setLoading(false);
    });
  }, [changes]);

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />

        <div className="bg-secondary pl-5 pr-2 pb-3 w-full">
          <div className=" h-fit px-3 overflow-x-auto">
            <div className="w-full">
              <div className="flex flex-col">
                <div className="sm:-mx-6 lg:-mx-8">
                  <div className="inline-block py-2 min-w-full">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              No
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Nama Produk
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Harga
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Keterangan
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td>
                                <Loading />
                              </td>
                            </tr>
                          ) : (
                            items.map((item, i) => (
                              <AdminProductList
                                key={item.id}
                                index={i}
                                item={item}
                                setChanges={setChanges}
                              />
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProduct;

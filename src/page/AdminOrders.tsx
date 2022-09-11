import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { CartInterface, ItemInterface } from "../utility/dataInterface";
import { collection, query, db, getDocs, where } from "../utility/database";
import Loading from "../components/Loading";
import AdminNavbar from "../components/AdminNavbar";
import AdminCartList from "../components/AdminCartList";

function AdminOrders() {
  const [items, setItems] = useState<CartInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [changes, setChanges] = useState<number>(0);

  useEffect(() => {
    const cartsDoc = query(collection(db, "Carts"));
    getDocs(cartsDoc).then((res) => {
      setItems(
        res.docs.map((value) => ({
          uid: value.id,
          address: value.data().address,
          phone: value.data().phone,
          name: value.data().displayName,
          email: value.data().email,
          items: value.data().items,
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
                              Name
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Address
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Orders Complete
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Deficit
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
                            <tr className="min-w-full flex justify-center">
                              <td>
                                <Loading />
                              </td>
                            </tr>
                          ) : (
                            items.map((item, i) => (
                              <AdminCartList
                                key={item.uid}
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

export default AdminOrders;

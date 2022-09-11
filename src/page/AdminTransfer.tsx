import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { TransferInterface } from "../utility/dataInterface";
import { collection, query, db, getDocs, orderBy } from "../utility/database";
import Loading from "../components/Loading";
import AdminNavbar from "../components/AdminNavbar";
import AdminTransferList from "../components/AdminTransferList";

function AdminTransfer() {
  const [items, setItems] = useState<TransferInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [changes, setChanges] = useState<number>(0);

  useEffect(() => {
    const transferDoc = query(collection(db, "Transfer"), orderBy("createdAt"));
    getDocs(transferDoc).then((res) => {
      setItems(
        res.docs.map((value) => ({
          uid: value.data().uid,
          id: value.id,
          channel: value.data().channel,
          createdAt: value.data().createdAt,
          deficit: value.data().deficit,
          img: value.data().img,
          phone: value.data().phone,
          name: value.data().name,
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
                              Channel
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
                              Deficit
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase"
                            >
                              Img
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
                              <AdminTransferList
                                key={i}
                                index={i}
                                item={item}
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

export default AdminTransfer;

import { useEffect, useState } from "react";
import { ItemInterface } from "../utility/dataInterface";
import { collection, query, db, getDocs, where } from "../utility/database";
import Product from "../components/Product";
import Loading from "../components/Loading";
import UserNavbar from "../components/UserNavbar";
import Carousel from "../components/Carousel";

function Home() {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, []);

  return (
    <div>
      <UserNavbar />
      <Carousel />
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {loading ? (
          <Loading />
        ) : (
          items.map((item) => <Product key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}

export default Home;

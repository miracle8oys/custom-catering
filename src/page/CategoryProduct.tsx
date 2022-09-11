import { useEffect, useState } from "react";
import { ItemInterface } from "../utility/dataInterface";
import { collection, query, db, getDocs, where } from "../utility/database";
import { useParams, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { IoMdArrowRoundBack } from "react-icons/io";

function CategoryProduct() {
  const [items, setItems] = useState<ItemInterface[]>([]);

  const { categoryItem } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const itemsDoc = query(
      collection(db, "Items"),
      where("available", "==", true),
      where("category", "array-contains", categoryItem)
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
    });
  }, [categoryItem]);

  return (
    <div>
      <IoMdArrowRoundBack onClick={() => navigate(-1)} />
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {items.map((item) => (
          <Product key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CategoryProduct;

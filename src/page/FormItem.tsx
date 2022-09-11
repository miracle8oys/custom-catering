import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  db,
  Timestamp,
  addDoc,
} from "../utility/database";
import { getDownloadURL, ref, storage, uploadBytes } from "../utility/storage";
import { useNavigate } from "react-router-dom";
function FormItem() {
  const [category, setCategory] = useState<Array<string>>([]);
  const [name, setName] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(true);
  const [categoryChoice, setCategoryChoice] = useState<Array<string>>([]);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [pic, setPic] = useState<FileList | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const categoryRef = collection(db, "Category");

    getDocs(categoryRef).then((res) => {
      setCategory(res.docs.map((value) => value.data().name));
    });
  }, []);

  const handlCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCategoryChoice((current) => [...current, e.target.value]);
    } else {
      setCategoryChoice((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };

  const handlAvailableStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  };

  const handleSubmitItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAt = Timestamp.now();
    const picUrl = await handleUploadImage(createdAt.seconds.toString());

    await addDoc(collection(db, "Items"), {
      name,
      available,
      category: categoryChoice,
      createdAt,
      desc: description,
      price,
      pic: picUrl,
    })
      .then(() => navigate("/admin/product-list"))
      .catch((err) => console.log(err));
  };

  const handleUploadImage = (imgName: string) => {
    const ImgRef = ref(storage, "IMG/" + imgName);
    if (pic) {
      return uploadBytes(ImgRef, pic[0]).then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => url);
      });
    } else {
      return "https://firebasestorage.googleapis.com/v0/b/bali-catering.appspot.com/o/IMG%2Fdefault.jpg?alt=media&token=514c449b-4e6a-4bb1-9332-02fa0d9f66eb";
    }
  };

  return (
    <div className="flex justify-center pt-7">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h1 className="pb-3 text-xl font-semibold">Add Item</h1>
        <form onSubmit={handleSubmitItem}>
          <div className="form-group mb-6">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Name"
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="number"
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Price"
            />
          </div>

          <div className="form-group form-check text-center mb-6 flex gap-3 justify-between">
            {category.map((item) => (
              <div className="w-14" key={item}>
                <input
                  type="checkbox"
                  onChange={handlCategoryInput}
                  value={item}
                  className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 text-black checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  id="exampleCheck87"
                />
                <label
                  className="form-check-label inline-block text-gray-800 capitalize"
                  htmlFor="exampleCheck87"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className="form-group mb-6">
            <input
              type="file"
              onChange={(e) => setPic(e.target.files)}
              className="form-control block
                        w-3/4
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
            />
          </div>

          <div className="form-group mb-6">
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
              id="exampleFormControlTextarea13"
              rows={3}
              placeholder="Description"
            ></textarea>
          </div>
          <div className="form-group form-check text-center mb-6">
            <input
              onChange={handlAvailableStatus}
              type="checkbox"
              className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 text-black checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              id="exampleCheck87"
              defaultChecked
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="exampleCheck87"
            >
              Available
            </label>
          </div>
          <button
            type="submit"
            className="
                w-full
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormItem;

import { ItemInterface } from "../utility/dataInterface";
function Product(item: ItemInterface) {
  return (
    <div className="md:my-1 my-2 px-1 w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <article className="overflow-hidden rounded-lg shadow-lg bg-slate-200 dark:bg-slate-700">
        <a href={`/detail/${item.id}`}>
          <img
            alt="Placeholder"
            className="block h-52 w-full object-cover"
            src={item.pic}
          />
        </a>

        <header className="flex flex-col md:flex-row gap-y-1 items-center justify-between leading-tight p-1 md:p-4">
          <h1 className="md:text-xl text-md">
            <a
              className="no-underline hover:underline text-black dark:text-white font-medium"
              href={`/detail/${item.id}`}
            >
              {item.name}
            </a>
          </h1>
          <p className="text-grey-darker text-black dark:text-white md:text-sm text-xs font-semibold">
            Rp. {item.price}
          </p>
        </header>

        <footer className="flex md:flex-row flex-col gap-y-2 items-center justify-between leading-none p-1 md:p-4">
          <div className="flex items-center gap-3">
            {item.category.map((value) => (
              <a
                key={value}
                className="no-underline hover:underline hover:text-blue-500 text-green-500 font-semibold capitalize"
                href={`/category/${value}`}
              >
                <h5 className="text-xs">{value}</h5>
              </a>
            ))}
          </div>
          <a
            className="no-underline bg-blue-500 rounded py-2 px-2 md:mt-0 text-grey-darker hover:text-red-dark"
            href={`/detail/${item.id}`}
          >
            <span className="font-semibold text-sm">Detail</span>
          </a>
        </footer>
      </article>
    </div>
  );
}

export default Product;

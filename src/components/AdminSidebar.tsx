import { NavLink } from "react-router-dom";
// import "../Style/sidebarAdmin.css";

const AdminSidebar = () => {
  const menu = [
    { name: "Product", link: "/admin/product-list" },
    { name: "Orders", link: "/admin/order-list" },
    { name: "Transfer", link: "/admin/transfer-list" },
  ];

  return (
    <div className="w-64 bg-gray-500 border-r border-slate-900">
      <ul className="grid grid-cols-1 divide-y divide-slate-900 border-b border-slate-900">
        <li className="bg-gray-400">
          <p className="text-center text-xl px-2 my-6 font-semibold">
            DASHBOARD
          </p>
        </li>
        {menu.map((item, index) => (
          <li key={index}>
            <NavLink to={item.link} className="">
              <p className={`text-xl p-2 hover:bg-orange-200 pl-4`}>
                {item.name}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;

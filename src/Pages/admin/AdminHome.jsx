import { useSelector } from "react-redux";

const AdminHome = ({totalCategories, totalEnquiries, totalLeads, totalBusinesses, totalBlogs, totalUsers}) => {
  const itemsToShow = [
    {name : "Businesses", value : totalBusinesses},
    {name : "Categories", value : totalCategories},
    {name : "Users", value : totalUsers},
    {name : "Enquiries", value : totalEnquiries},
    {name : "Leads", value : totalLeads},
    {name : "Blogs", value : totalBlogs},
  ]
  const categoriesFromState = useSelector((state) => state.categories);
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium mb-5">
          WELCOME TO THE ADMIN PANEL
        </h1>

      </div>
      <div>
        <div className="grid grid-cols-4 gap-4">
          {itemsToShow.map((item, index) => (
            <div key={index} className="flex relative overflow-hidden items-center gap-6 border rounded-xl py-10 shadow-sm bg-white justify-center">
              <div className="flex flex-col items-center gap-2">

<img src={`/assets/admin/${item.name.toLowerCase()}.png`} alt="" className="w-12 h-12 opacity-70 grayscale" />
<h2 className="text-base">{item.name}</h2>
</div>


              <span className="text-gray-500 text-4xl">{item.value}</span>
              </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

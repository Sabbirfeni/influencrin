import InfluencerManagementWrapper from "@/components/wrappers/influencer-managment-wrapper";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const products = [
  { title: "Product A", price: 29.99, active: true },
  { title: "Product B", price: 49.99, active: false },
  { title: "Product C", price: 19.99, active: true },
  { title: "Product D", price: 99.99, active: false },
  { title: "Product E", price: 59.99, active: true },
];

function ManageInfluencerPage() {
  return (
    <InfluencerManagementWrapper>
      <DataTable columns={columns} data={products} />
    </InfluencerManagementWrapper>
  );
}

export default ManageInfluencerPage;

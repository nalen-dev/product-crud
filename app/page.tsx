import AddItem from "@/components/AddItem";
import MyTable from "@/components/Table";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <div className="container-md w-75 mt-5">
      <div className="d-flex justify-content-between mb-3 ">
        <div className="red-hat fs-3 fw-semibold ">Product Table</div>
        <AddItem />
      </div>
      <section>
        <MyTable></MyTable>
      </section>
    </div>
  );
}

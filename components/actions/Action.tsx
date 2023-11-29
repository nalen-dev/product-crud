import React from "react";
import ActionDetail from "./ActionDetail";
import ActionEdit from "./ActionEdit";
import ActionDelete from "./ActionDelete";
import { product } from "@/lib/dummyData";

interface ActionsProps {
  product: product;
}

const Actions = ({ product }: ActionsProps) => {
  return (
    <div className="d-flex justify-content-center " style={{ gap: "10px" }}>
      <ActionDetail product={product} />
      <ActionEdit product={product} />
      <ActionDelete product={product} />
    </div>
  );
};

export default Actions;

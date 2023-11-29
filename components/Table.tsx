"use client";

import Table from "react-bootstrap/Table";
import Actions from "./actions/Action";

import { product } from "@/lib/dummyData";
import { useEffect, useState } from "react";
import axios from "axios";

function MyTable() {
  const [products, setProducts] = useState<product[] | null>(null);

  let host: string;

  useEffect(() => {
    host = window.location.host;
    const fetchData = async () => {
      const response = await axios.get(`http://${host}/api/products`);
      setProducts(response.data);
    };
    fetchData();
  }, []);

  return (
    <Table striped borderless className="border ">
      <thead>
        <tr>
          <th className="text-center ">No</th>
          <th style={{ width: "35%" }}>Name</th>
          <th className="text-center ">Quantity</th>
          <th>Price</th>
          <th className="text-center" style={{ width: "25%" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products ? (
          products.map((product, index) => {
            return (
              <tr key={product.id.toString()}>
                <td className="text-center fw-bold ">{index + 1}</td>
                <td>{product.name}</td>
                <td className="text-center ">{product.quantity.toString()}</td>
                <td>{product.price.toString()}</td>
                <td>
                  <Actions product={product} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className="text-center text-secondary ">
              field is still empety
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default MyTable;

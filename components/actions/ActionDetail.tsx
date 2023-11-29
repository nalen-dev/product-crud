"use client";

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { product } from "@/lib/dummyData";

interface ActionsDetailProps {
  product: product;
}

const ActionDetail = ({ product }: ActionsDetailProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <Button
        size="sm"
        style={{ width: "30px", height: "30px" }}
        onClick={handleShow}
      >
        i
      </Button>

      {/* modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product.name}
            <div className="fs-6 text-secondary fw-normal ">
              Quantity {product.quantity.toString()}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <article>
            {" "}
            {product.description ? (
              product.description
            ) : (
              <div className="text-secondary fst-italic ">no description</div>
            )}
          </article>
          <section className="my-4">
            <h2>Rp. {product.price.toString()}</h2>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActionDetail;

"use client";

import React, { useState, useEffect } from "react";

import { Loader, Pencil } from "lucide-react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import { product } from "@/lib/dummyData";
import axios from "axios";

interface ActionsEditProps {
  product: product;
}

const ActionEdit = ({ product }: ActionsEditProps) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [showB, setShowB] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowB = () => setShowB(!showB);

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const origin = window.location.origin;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await axios.put(`${origin}/api/products/${product.id}`, {
        data,
      });

      setShow(false);
      setShowB(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setData({
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      price: product.price,
    });
    setShow(true);
  };

  return (
    <div>
      <Button
        variant="warning"
        size="sm"
        style={{ width: "30px", height: "30px" }}
        onClick={handleShow}
      >
        <Pencil size={14} />
      </Button>

      {/* modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Product Name"
                onChange={updateData}
                defaultValue={product.name.toString()}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                name="quantity"
                type="number"
                placeholder="0"
                min="0"
                onChange={updateData}
                defaultValue={product.quantity.toString()}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                placeholder="0"
                min="0"
                onChange={updateData}
                defaultValue={product.price.toString()}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                onChange={updateData}
                defaultValue={product.description?.toString()}
              />
            </Form.Group>

            <div className="d-flex" style={{ gap: "10px" }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {!isLoading ? "Update" : <Loader />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Toast
        onClose={toggleShowB}
        show={showB}
        animation={false}
        className="position-absolute "
        bg="warning"
        style={{ bottom: "50px", right: "50px" }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Updated</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-white ">
          Updating data product from database
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ActionEdit;

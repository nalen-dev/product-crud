"use client";

import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row, Toast } from "react-bootstrap";

const AddItem = () => {
  let origin: string = "";

  useEffect(() => {
    origin = window.location.origin;
  }, []);

  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [showB, setShowB] = useState(false);

  const toggleShowB = () => setShowB(!showB);

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(origin);
      await axios.post(`${origin}/api/products`, {
        data,
      });

      setIsLoading(false);
      setShow(false);
      setShowB(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button variant="success" size="sm" onClick={handleShow}>
        Add item
      </Button>

      {/* modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
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
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                onChange={updateData}
              />
            </Form.Group>

            <div className="d-flex" style={{ gap: "10px" }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {!isLoading ? "Submit" : <Loader />}
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
        bg="success"
        style={{ bottom: "50px", right: "50px" }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Success</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-white ">
          Add new product to database
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AddItem;

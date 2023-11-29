import { useState } from "react";

import { Loader, Trash2 } from "lucide-react";
import { Button, Modal, Toast } from "react-bootstrap";

import { product } from "@/lib/dummyData";
import axios from "axios";

interface ActionsDeleteProps {
  product: product;
}

const ActionDelete = ({ product }: ActionsDeleteProps) => {
  const [show, setShow] = useState(false);
  const [showB, setShowB] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleShowB = () => setShowB(!showB);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3000/api/products/${product.id}`);
      setIsLoading(false);
      setShow(false);
      setShowB(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        variant="danger"
        size="sm"
        style={{ width: "30px", height: "30px" }}
        onClick={handleShow}
      >
        <Trash2 size={14} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {!isLoading ? "Delete" : <Loader />}
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        onClose={toggleShowB}
        show={showB}
        animation={false}
        className="position-absolute "
        bg="danger"
        style={{ bottom: "50px", right: "50px" }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Deleted</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-white ">
          Deleting product from Database
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ActionDelete;

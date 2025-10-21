import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Image, Spinner } from "react-bootstrap";
import API from "../../api/api"; // your custom Axios instance
import "../../assets/styles/home.css";

function ManageBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    status: "active",
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await API.get("/banners");
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOpen = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        image: null,
        status: banner.status,
      });
    } else {
      setEditingBanner(null);
      setFormData({ title: "", image: null, status: "active" });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    if (formData.image) data.append("image", formData.image);
    data.append("status", formData.status);

    try {
      if (editingBanner) {
        await API.post(`/banners/${editingBanner.id}?_method=PUT`, data);
      } else {
        await API.post("/banners", data);
      }
      fetchBanners();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await API.delete(`/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageClick = (banner) => {
    setSelectedImage(banner);
    setShowImageModal(true);
  };

  return (
    <div className="container py-4" style={{ marginBottom: "50px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Banners</h2>
        <Button
          onClick={() => handleOpen()}
          className="d-flex align-items-center px-4 py-2"
          style={{
            background: "linear-gradient(90deg, #000000, #434343)",
            border: "none",
            fontWeight: "600",
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          <i className="bi bi-plus-lg me-2"></i> Add Banner
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>

          <tr>
            <th>#</th>
            <th>Preview</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          ) : banners.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-3">
                No banners found.
              </td>
            </tr>
          ) : (
            banners.map((banner, index) => (
              <tr key={banner.id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    className="table-image"
                    onClick={() => handleImageClick(banner)}
                  />
                </td>
                <td>{banner.title}</td>
                <td>
                  <span
                    className={`badge ${
                      banner.status === "active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {banner.status}
                  </span>
                </td>
                <td>{new Date(banner.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleOpen(banner)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(banner.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingBanner ? "Edit Banner" : "Add Banner"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Preview Modal */}
<Modal
  show={showImageModal}
  onHide={() => setShowImageModal(false)}
  centered
  size="lg"
>
  {/* Modal Header with Close Button */}
  <Modal.Header closeButton>
    <Modal.Title></Modal.Title>
  </Modal.Header>

  {/* Modal Body with Image */}
  <Modal.Body className="p-0">
    {selectedImage && (
      <Image
        src={selectedImage.image_url}
        alt={selectedImage.title}
        fluid
        style={{ objectFit: "cover", width: "100%" }}
      />
    )}
  </Modal.Body>

  {/* Modal Footer with Title */}
  <Modal.Footer className="justify-content-center bg-dark bg-opacity-75">
    <span className="text-white fw-semibold">{selectedImage?.title}</span>
  </Modal.Footer>
</Modal>


      {/* CSS for zoom effect */}
      <style jsx="true">{`
        .table-image {
          width: 100px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          cursor: zoom-in;
        }
      `}</style>
    </div>
  );
}

export default ManageBanner;

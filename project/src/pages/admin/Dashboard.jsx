import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0
  });

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, users, orders] = await Promise.all([
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/orders')
        ]);

        setStats({
          totalProducts: products.data.length,
          totalUsers: users.data.length,
          totalOrders: orders.data.length
        });

        setProducts(products.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', formData);
      setProducts([...products, response.data]);
      setFormData({ name: '', price: '', description: '', image: '', category: '' });
      setStats(prev => ({ ...prev, totalProducts: prev.totalProducts + 1 }));
      setShowModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
        setStats(prev => ({ ...prev, totalProducts: prev.totalProducts - 1 }));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${editingProduct.id}`,
        formData
      );
      setProducts(products.map(product => 
        product.id === editingProduct.id ? response.data : product
      ));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleShowAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', image: '', category: '' });
    setShowModal(true);
  };

  const handleShowEditModal = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', image: '', category: '' });
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* Statistics Cards */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text className="h2">{stats.totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="h2">{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text className="h2">{stats.totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Management Section */}
      <Row className="mt-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h3>Product Management</h3>
          <Button variant="primary" onClick={handleShowAddModal}>
            Add New Product
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleShowEditModal(product)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Edit/Add Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
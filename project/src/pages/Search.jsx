import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Ultrabook Laptop",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      price: 1100,
      category: "Electronics",
      quantity: 1,
      description: "Sleek and lightweight ultrabook for professionals. It features a high-resolution display, long battery life, and powerful performance for all your work needs."
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      image: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg",
      price: 90,
      category: "Accessories",
      quantity: 0,
      description: "Portable Bluetooth speaker with deep bass. Perfect for outdoor activities, parties, or just relaxing at home. Connects easily to your devices and has a long-lasting battery."
    },
    {
      id: 3,
      name: "Fitness Tracker",
      image: "https://images.pexels.com/photos/4035922/pexels-photo-4035922.jpeg",
      price: 200,
      category: "Wearable Tech",
      quantity: 4,
      description: "Track your workouts and health stats easily. This fitness tracker monitors your heart rate, steps, sleep, and more. It syncs with your smartphone for detailed insights."
    },
    {
      id: 4,
      name: "Road Bike",
      image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg",
      price: 750,
      category: "Sports",
      quantity: 2,
      description: "Lightweight road bike for city commutes. Designed for speed and comfort, this bike features a durable frame, smooth gear shifting, and reliable brakes for a safe ride."
    }
  ];

  // Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products based on search term and selected category
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Search Products</h2>

      {/* Search Input */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {/* Category Filter Buttons */}
      <div className="text-center mb-4">
        <h4>Browse by Category:</h4>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`btn ${selectedCategory === category ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Display Filtered Products */}
      <Row className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                  <p className="card-text"><strong>Category:</strong> {product.category}</p>
                  <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
                  <p className="card-text">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <button
                    className={`btn ${
                      product.quantity === 0
                        ? "btn-secondary"
                        : product.quantity === 1
                        ? "btn-danger"
                        : "btn-success"
                    }`}
                    disabled={product.quantity === 0}
                  >
                    {product.quantity === 0
                      ? "Out of Stock"
                      : product.quantity === 1
                      ? "Hurry, Only 1 Left!"
                      : "Buy Now"}
                  </button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center w-100">No products found</div>
        )}
      </Row>
    </Container>
  );
}

export default Search;
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Accordion, Card, InputGroup } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import FAQItem from "./FAQItem";

function HelpCenterDashboard() {
  const [faqs] = useState([
    { question: "How can I track my order?", answer: "You can track your order by going to the 'Track Orders' section and entering your Order ID." },
    { question: "What payment methods do you accept?", answer: "We accept Credit/Debit cards, UPI, and Wallet payments." },
    { question: "How do I return a product?", answer: "You can return products by visiting 'Orders' -> 'Return & Refunds' and following the steps." },
    { question: "How can I change my shipping address?", answer: "Go to 'My Account' -> 'Shipping Addresses' and add or update your address." },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [ticket, setTicket] = useState({ name: "", email: "", message: "" });

  const handleTicketChange = (e) => setTicket({ ...ticket, [e.target.name]: e.target.value });
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    alert("Your query has been submitted!");
    setTicket({ name: "", email: "", message: "" });
  };

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4 text-center" style={{ fontSize: "2rem", color: "#2c3e50" }}>
        🛠 Help Center
      </h2>

      {/* Search Bar */}
      <Row className="mb-5 justify-content-center">
        <Col lg={8}>
          <InputGroup className="shadow-sm rounded-pill overflow-hidden">
            <Form.Control
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 px-4 py-3"
              style={{ fontSize: "1rem" }}
            />
            <Button variant="primary" className="px-4 fw-semibold">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {/* FAQs Section */}
        <Col lg={7} className="mb-4">
          <h5 className="fw-semibold mb-3 text-dark">Frequently Asked Questions</h5>
          <Accordion alwaysOpen className="shadow-sm rounded-4 overflow-hidden">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <FAQItem key={index} eventKey={index.toString()} question={faq.question} answer={faq.answer} />
              ))}
            </AnimatePresence>
            {filteredFaqs.length === 0 && (
              <div className="text-center p-4 text-muted">No results found for "{searchTerm}"</div>
            )}
          </Accordion>
        </Col>

        {/* Submit Ticket */}
        <Col lg={5}>
          <Card className="shadow-sm border-0 rounded-4 p-4 hover-shadow" style={{ background: "#f8f9fa" }}>
            <h5 className="fw-semibold mb-4 text-dark">Submit a Query</h5>
            <Form onSubmit={handleSubmitTicket}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={ticket.name}
                  onChange={handleTicketChange}
                  required
                  className="rounded-pill px-3 py-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={ticket.email}
                  onChange={handleTicketChange}
                  required
                  className="rounded-pill px-3 py-2"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={ticket.message}
                  onChange={handleTicketChange}
                  required
                  className="rounded-3 px-3 py-2"
                />
              </Form.Group>
              <Button type="submit" className="w-100 py-2 fw-semibold" style={{ background: "#007bff", border: "none" }}>
                Submit Ticket
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HelpCenterDashboard;

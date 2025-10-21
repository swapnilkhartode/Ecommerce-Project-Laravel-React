import React from "react";
import { Accordion } from "react-bootstrap";
import { motion } from "framer-motion";

const FAQItem = ({ eventKey, question, answer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>{question}</Accordion.Header>
        <Accordion.Body>{answer}</Accordion.Body>
      </Accordion.Item>
    </motion.div>
  );
};

export default FAQItem;

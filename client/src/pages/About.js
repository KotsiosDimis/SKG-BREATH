// src/pages/About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import PollutantCard from '../components/PollutantCard';
import pollutants from '../data/pollutants';

const About = () => {
  return (
    <Layout>
      <Container className="mt-4">
        <Row>
          {pollutants.map((pollutant) => (
            <Col xs={12} md={6} className="mb-4" key={pollutant.id}>
              <PollutantCard {...pollutant} />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default About;

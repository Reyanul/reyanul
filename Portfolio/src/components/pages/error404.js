import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const Error404 = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10); // Initialize countdown to 20 seconds
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.quotable.io/quotes/random')
      .then(response => {
        setQuote(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the quote:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center p-2">
      <Row>
        <Col className="text-center">
          <div className='my-5'>
            <h1 className="my-3 text-danger" style={{ fontSize: '10rem' }}>3rror 404</h1>
            <h3 className='text-warning'>Seems like you are lost !!</h3>
            <h6 className='text-success'>Well, Here's thought of the day</h6>
            <p className='text-white'>Redirecting in {countdown} seconds...</p>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Card className="text-center">
              <Card.Body>
                <Card.Text>
                  {quote.content}
                </Card.Text>
                <Card.Footer className="text-muted">
                  — {quote.author}
                </Card.Footer>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;

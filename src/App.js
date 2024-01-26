
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const RuleForm = () => {
  const [rules, setRules] = useState([
    { key: 'age', output: { value: '', operator: '>=', score: '' } }
  ]);
  const [combinator, setCombinator] = useState('and');
  const [jsonContent, setJsonContent] = useState('');

  const handleChange = (index, field, value) => {
    setRules((prevRules) => {
      const newRules = [...prevRules];
      if (field === 'key') {
        newRules[index] = { key: value, output: { value: '', operator: '>=', score: '' } };
      } else {
        newRules[index].output[field] = value;
      }
      return newRules;
    });
  };

  const generateJson = () => {
    const jsonData = { rules, combinator };
    const jsonString = JSON.stringify(jsonData, null, 2);
    return jsonString;
  };

  const handleAddRule = () => {
    const newRule = { key: `rule-${new Date().getTime()}`, output: { value: '', operator: '>=', score: '' } };
    setRules([...rules, newRule]);
  };

  const handleDeleteRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleSubmit = () => {
    const jsonContent = generateJson();
    setJsonContent(jsonContent);

    const blob = new Blob([jsonContent], { type: 'application/json' });
    saveAs(blob, 'rules.json');

    console.log(jsonContent);
  };

  return (
    <Container className="my-4 p-4 border border-primary">
      <Form>
        <Form.Group>
          <Form.Label>Connector Type</Form.Label>
          <Form.Control
            as="select"
            value={combinator}
            onChange={(e) => setCombinator(e.target.value)}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Form.Control>
        </Form.Group>
        {rules.map((rule, index) => (
          <Row key={rule.key} className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Rule Type</Form.Label>
                <Form.Control
                  as="select"
                  value={rule.output.key}
                  onChange={(e) => handleChange(index, 'key', e.target.value)}
                >
                  <option value="age">{' Age'}</option>
                  <option value="credit_score">{'Credit Score'}</option>
                  <option value="account_balance">{'Account Balance'}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
             <Form.Group>
                 <Form.Label>Operator</Form.Label>
              <Form.Control
                  as="select"
                  value={rule.output.operator}
                  onChange={(e) => handleChange(index, 'operator', e.target.value)}
                >
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value=">=">{'>='}</option>
                  <option value="<=">{'<='}</option>
                  <option value="=">{'='}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  value={rule.output.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="text"
                  value={rule.output.score}
                  onChange={(e) => handleChange(index, 'score', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleDeleteRule(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}
        <Button variant="primary" onClick={handleAddRule}>
          Add Rule
        </Button>
        <Button variant="success" onClick={handleSubmit} className="ml-2">
          Submit
        </Button>
        
      </Form>

      {jsonContent && (
        <div className="mt-4">
          <h2>JSON Content</h2>
          <pre>{jsonContent}</pre>
        </div>
      )}
    </Container>
  );
};

export default RuleForm;

import style from './App.module.css';
import GitTable from './components/Table/Table';
import { Container, Row, Col, Alert } from 'react-bootstrap';

function App() {
  return (
    <Container fluid className={style.app}>
      <Row>
        <Col>
          <Alert>
            <h3>Development Test</h3>
            <h5>Mark Van Spall</h5>
            <hr />
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }} className={style.tableCol}>
            <GitTable />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

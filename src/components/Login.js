import { useState } from "react";
import { Container, Form, FloatingLabel, Card, Button } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return ( 
        <>
            <Container fluid="md" className="centered">

                <Card className="card-thin text-black">
                    <h2 className="mt-4 text-center">Login</h2>
                    <Card.Body>
                        <Form className="fatter-text text-center">
                            <Form.Group>
                                <FloatingLabel label="Username">
                                    <Form.Control
                                        type='text'
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mt-2 mb-3">
                                <FloatingLabel label="Password">
                                    <Form.Control
                                        type='text'
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Button className="btn-success button-large">Login</Button>
                        </Form>
                        <p className="mt-3 text-center">Don't have an account?<button className="link-button">Sign Up</button> </p>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
 
export default Login;
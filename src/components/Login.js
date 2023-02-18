import axios from "axios";
import { useState } from "react";
import { Container, Form, FloatingLabel, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "./AlertScript";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showInvalid, setShowInvalid] = useState(false);


    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
    }

    const navigateTo = useNavigate();


    const login = () =>{
        const url = "http://localhost/contact/users.php";
        const jsonData = {
            username: username,
            password: password
        }

        const formData = new FormData();
        formData.append("operation", "login");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url: url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                setShowInvalid(false);
                getAlert("success", "Success!");
                setTimeout(() => {navigateTo("/", {state:{id: res.data.user_id}})}, 2000);
            }else{
                setShowInvalid(false);
                setTimeout(() => {setShowInvalid(true)}, 300)
            }
        })

        .catch((err)=>{
            getAlert("danger", "There was an error occured: " + err);
        })
    }

    return ( 
        <>
            <Container fluid="md" className="centered">

                <Card className="card-thin text-black">
                    <h2 className="mt-4 text-center">Login</h2>         
                    <Card.Body>
                        <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
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
                                {
                                    showInvalid &&
                                    <Form.Text className="text-danger">
                                        Wrong username or password
                                    </Form.Text>
                                }
                            </Form.Group>

                            <Button className="btn-success button-large" onClick={login}>Login</Button>
                        </Form>
                        <p className="mt-3 text-center">Don't have an account?<button className="link-button" onClick={() => navigateTo("/signup")}>Sign Up</button> </p>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
 
export default Login;
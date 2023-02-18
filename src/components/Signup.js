import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "./AlertScript";

const Signup = () => {
    //form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    //form validation
    const [validated, setValidated] = useState(false);
    const [users, setUsers] = useState([]);

    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const navigateTo = useNavigate();

    useEffect(() =>{
        getUser();
    })


    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
  }

    const signup = () =>{
        const url = "http://localhost/contact/users.php";

        const jsonData = {
            username: username,
            password: password,
            fullName: fullName,
            email: email
        }

        const formData = new FormData();

        formData.append("operation", "signup");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url:url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                getAlert("success","Registration Successful!");
                setTimeout(() => {navigateTo("/login")}, 2000);
            }
        })

        .catch((err)=>{
            getAlert("danger", "Error occured: " + err);
        })
        

    }

    const getUser = () =>{
        const url = "http://localhost/contact/users.php";
        const formData = new FormData();

        formData.append("operation", "getUsername");

        axios({
            url:url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            setUsers(res.data);
        })

        .catch((err)=>{
            getAlert("danger", "Error occured: " + err);
        })
        
    }

    const formValidation = (e) =>{
        const form = e.currentTarget;

        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();

        }else{
            const duplicateUser = users.find(user => user.user_username === username);
            const duplicateEmail = users.find(user => user.user_email === email);

            if(duplicateUser && duplicateEmail){
                setUsername("");
                setEmail("");
                getAlert("danger", "Sorry, this username and email is already taken.")
            }else if(duplicateUser){
                setUsername("");
                getAlert("danger", "Sorry, this username is already taken.");
            }else if(duplicateEmail){
                setEmail("");
                getAlert("danger", "Sorry, this email is already taken.");
            }else{
                signup();
            }

            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }

    return ( 
        <>
        <Container fluid="md" className="centered">

            <Card className="card-thin text-black">
                <h2 className="mt-4 text-center">Signup</h2>
                <Card.Body>
                    <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                    <Form noValidate validated={validated} className="fatter-text" onSubmit={formValidation}>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Full name">
                                <Form.Control
                                    type='text'
                                    placeholder="Full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Username">
                                <Form.Control
                                    type='text'
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Password">
                                <Form.Control
                                    type='password'
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Email">
                                <Form.Control
                                    type='email'
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Invalid email address
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Button type="submit" className="btn-success button-large">Signup</Button>
                    </Form>
                    <p className="mt-3 text-center">Already have an account?<button className="link-button" onClick={() => navigateTo("/login")}>Log in</button> </p>

                </Card.Body>
            </Card>
        </Container>
    </>
     );
}
 
export default Signup;
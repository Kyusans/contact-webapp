import axios from "axios";
import { useState } from "react";
import { Form, FloatingLabel, Button, Modal, Container} from "react-bootstrap";
import AlertScript from "./AlertScript";

const AddGroup = (props) => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");

    const {show, onHide} = props;

    //for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");


	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}

    const addGroup = () =>{
        const url = "http://localhost/contact/users.php";
        const userId = sessionStorage.getItem("userId");

        const jsonData = {
            name: name,
            userId: userId
        }

        const formData = new FormData();

        formData.append("operation", "addGroup");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url:url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                getAlert("success","Successful!");
                setTimeout(() => {handleOnHide()}, 2000);
            }
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
            addGroup();
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }

    const handleOnHide = () =>{
        setName("");
        setValidated(false);
        setShowAlert(false);
        onHide();
    }

    return ( 
        <>
            <Modal className="text-black" show={show} onHide={handleOnHide}>
                <Modal.Header>
                    <h3>Add Group List</h3>
                </Modal.Header>
                <Modal.Body>
                    <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                    <Form noValidate validated={validated} className="fatter-text" onSubmit={formValidation}>
                        <Form.Group>
                            <FloatingLabel label="Group Name">
                                <Form.Control
                                    type='text'
                                    placeholder="Group Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required    
                                </Form.Control.Feedback> 
                            </FloatingLabel>
                        </Form.Group>
                        <hr />
                        <Container className="text-end">
                            <Button className="btn-danger" onClick={handleOnHide} style={{marginRight: "5px"}}>Close</Button>
                            <Button className="btn-success" type="submit">Submit</Button>
                        </Container>

                    </Form>
                </Modal.Body>
            </Modal>

        </>
     );
}
 
export default AddGroup;
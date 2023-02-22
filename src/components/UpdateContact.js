import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import AlertScript from "./AlertScript";

const UpdateContact = () => {    
    const [fullName , setFullName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [officeNumber, setOfficeNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [secondMobileNumber, setSecondMobileNumber] = useState("");
    const [groupId, setGroupId] = useState("");

    const navigateTo = useNavigate();
    const location = useLocation();

    const [contact, setContact] = useState({});
    const [group, setGroup] = useState([]);

    //for validation
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const selectedContact = () => {
          const url = "http://localhost/contact/users.php";
          const conId = location.state.contactId;
      
          const jsonData = {
            contactId: conId,
          };
      
          const formData = new FormData();
      
          formData.append("operation", "selectContact");
          formData.append("json", JSON.stringify(jsonData));
      
          axios({
            url: url,
            data: formData,
            method: "post",
          })
            .then((res) => {
              if (res.data !== 0) {
                setContact(res.data);
              }
            })
            .catch((err) => {
              getAlert("danger", "Error occured: " + err);
            });
        };

        const getGroup = () =>{
            const url = "http://localhost/contact/users.php";
            const userId = sessionStorage.getItem("userId");
            const jsonData = {
                userId: userId
            }
    
            const formData = new FormData();
    
            formData.append("operation", "getGroup");
            formData.append("json", JSON.stringify(jsonData));
    
            axios({
                url: url,
                data: formData,
                method: "post"
            })
    
            .then((res) =>{
                if(res.data !== 0){
                    setGroup(res.data);
                }
            })
    
            .catch((err)=>{
                getAlert("danger", "Error occured: " + err);
            })
            
        }
        getGroup();
        selectedContact();
    }, [location.state.contactId]);
      
    useEffect(() => {
        setFullName(contact.con_fullName);
        setMobileNumber(contact.con_mobileNumber);
        setOfficeNumber(contact.con_officeNumber);
        setAddress(contact.con_address);
        setEmail(contact.con_email);
        setSecondMobileNumber(contact.con_mobileNumber2);
    }, [
            contact.con_address,
            contact.con_email,
            contact.con_fullName,
            contact.con_mobileNumber,
            contact.con_mobileNumber2,
            contact.con_officeNumber,
        ]);

    const updateContact = () =>{
        const url = "http://localhost/contact/users.php";
        const groupID = groupId;
        const conId = location.state.contactId;

        const jsonData = {
            contactId: conId,
            fullName: fullName,
            mobileNumber: mobileNumber,
            officeNumber: officeNumber,
            address: address,
            email: email,
            groupId: groupID,
            secondMobileNumber: secondMobileNumber
        }

        const formData = new FormData();

        formData.append("operation", "updateContact");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url:url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                getAlert("success","Success!");
                setTimeout(() => {
                    navigateTo("/");
                }, 2000);
            }
        })

        .catch((err)=>{
            getAlert("danger", "Error occured: " + err);
        })
        
    }

    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
    }

    const formValidation = (e) =>{
        const form = e.currentTarget;

        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            updateContact();
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }

    return ( 
        <>
           <Container className="centered">
                <Card className="card-thin text-black">
                    <Card.Body>
                        <h3 className="mt-4 text-black">Add Contact</h3>      
    
                        <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                        <Form noValidate validated={validated} className="fatter-text text-center text-black" onSubmit={formValidation}>
                            <Form.Group>
                                <FloatingLabel label="Full Name">
                                    <Form.Control
                                        type='text'
                                        placeholder="Full Name"
                                        value={fullName || ""}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required    
                                    </Form.Control.Feedback> 
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mt-2 mb-3">
                                <FloatingLabel label="Mobile Number">
                                    <Form.Control
                                        type='text'
                                        placeholder="Mobile Number"
                                        value={mobileNumber || ""}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required    
                                    </Form.Control.Feedback> 
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel label="Office number(Optional)">
                                    <Form.Control
                                        type='text'
                                        placeholder="Office Number(Optional)"
                                        value={officeNumber || ""}
                                        onChange={(e) => setOfficeNumber(e.target.value)}
                                    />
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel label="Address(Optional)">
                                    <Form.Control
                                        type='text'
                                        placeholder="Address(Optional)"
                                        value={address || ""}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel label="Email(Optional)">
                                    <Form.Control
                                        type='text'
                                        placeholder="Email(Optional)"
                                        value={email || ""}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel label="2nd Mobile Number(Optional)">
                                    <Form.Control
                                        type='text'
                                        placeholder="2nd Mobile Number(Optional)"
                                        value={secondMobileNumber || ""}
                                        onChange={(e) => setSecondMobileNumber(e.target.value)}
                                    />
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Select aria-label="Default select example">
                                <option>Select Group</option>
                                
                                {group.map((groups, index) => (
                                    <option value={groups.grp_id} key={index} onClick={() => setGroupId(groups.grp_id)}>{groups.grp_name}</option>
                                ))}

                            </Form.Select>
                            <hr />
                            <Container className="text-end">
                                <Button className="btn-danger" onClick={() => navigateTo("/")} style={{marginRight: "5px"}}>Back</Button>
                                <Button type="submit" className="btn-success">Submit</Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
 
export default UpdateContact;
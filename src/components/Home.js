import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import AlertScript from "./AlertScript";


const Home = () => {

	const [isLoggedin, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState("");

	const [contact, setContact] = useState([]);
	const navigateTo = useNavigate();

	//for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");


	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}

	const getContact = () =>{
		setUserId(sessionStorage.getItem("userId"));
		setIsLoggedIn(true);
		const url = "http://localhost/contact/users.php";
        const jsonData = {
            userId: userId,
        }

        const formData = new FormData();
        formData.append("operation", "getContact");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url: url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
				setContact(res.data);
            }
        })

        .catch((err)=>{
            alert("There was an error occured: " + err);
        })
	}

	useEffect(() => {
		if(sessionStorage.getItem("userId") !== null){
			getContact();
		}
	})

	const deleteContact = (id) =>{
       if(window.confirm("Are you sure you wish to delete this?")){
			const url = "http://localhost/contact/users.php";
			const conId = id;
			const jsonData = {
				conId: conId
			}

			const formData = new FormData();

			formData.append("operation", "deleteContact");
			formData.append("json", JSON.stringify(jsonData));

			axios({
				url:url,
				data: formData,
				method: "post"
			})

			.then((res) =>{
				if(res.data !== 0){
					setContact(contact.filter((c) => c.con_id !== id));
					getAlert("success", "Successfully deleted!");
					setTimeout(() => {
						setShowAlert(false);
					}, 3000);
				}
			})

			.catch((err)=>{
				alert("danger", "Error occured: " + err);
			})
	   }
        
    }

	const handleUpdateButton = (id) =>{
		console.log("ID: " + id)
		navigateTo("/updatecontact", {state:{contactId:id}})
	}

	return ( 
		<>
			{
				!isLoggedin ? <h1 className="mt-3 text-center">You need to login first</h1> :
				<>
					<Container className="mt-3" style={{ display: "flex", justifyContent: "flex-end" }}>
						<Button style={{marginRight: "5px"}} onClick={() => navigateTo("/addgroup")}><FaPlus /> Add group</Button>
						<Button onClick={() => navigateTo("/addcontact")}><FaPlus /> Add contact</Button>
					</Container>

					<Container>
					 	<AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
						<Table bordered hover striped responsive className="text-white mt-2" size="lg" variant="dark">
							<thead>
								<tr>
									<th>Name</th>
									<th>Mobile number</th>
									<th>Office number</th>
									<th>Address</th>
									<th>Email</th>
									<th>2nd Mobile number</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{ contact && contact.map((contacts, index) =>(
									<tr key={index}>
										<td>{contacts.con_fullName}</td>
										<td>{contacts.con_mobileNumber}</td>
										<td>{contacts.con_officeNumber === "" ? "N/A" : contacts.con_officeNumber}</td>
										<td>{contacts.con_address === "" ? "N/A" : contacts.con_address}</td>
										<td>{contacts.con_email === "" ? "N/A" : contacts.con_email}</td>
										<td>{contacts.con_mobileNumber2 === "" ? "N/A" : contacts.con_mobileNumber2}</td>
										<td className="text-center">
											<Button className="btn-success" onClick={() => handleUpdateButton(contacts.con_id)}>Update</Button>{" "}
											<Button className="btn-danger" onClick={() => (deleteContact(contacts.con_id))}>Delete</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
					
				</>
			}
		</>
	 );
}
 
export default Home;
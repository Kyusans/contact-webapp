import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import AddContact from "./AddContact";
import AddGroup from "./AddGroup";
import AlertScript from "./AlertScript";
import UpdateContact from "./UpdateContact";

const Home = () => {

	const [isLoggedin, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState("");
	const [contactId, setContactId] = useState("");

	const [contact, setContact] = useState([]);

	//for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");


	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}

	useEffect(() => {
		if(sessionStorage.getItem("userId") !== null){
			getContact();
		}
	})


	//for modal

	//---------------Add Contact Modal
	const [showAddContactModal, setAddContactModal] = useState(false);
	const hideAddContactModal = () =>{
		setAddContactModal(false);
	}
	const openAddContactModal = () =>{
		setAddContactModal(true);
	}
	//---------------//


	//---------------Add Group Modal
	const [showAddGroupModal, setAddGroupModal] = useState(false);
	const hideAddGroupModal = () =>{
		setAddGroupModal(false);
	}
	const openAddGroupModal = () =>{
		setAddGroupModal(true);
	}
	//---------------//

	//---------------Update contact Modal
	const [showUpdateModal, setUpdateModal] = useState(false);
	const hideUpdateModal = () =>{
		setUpdateModal(false);
	}
	const openUpdateModal = (id) =>{
		setContactId(id);
		setUpdateModal(true);
	}
	//---------------//

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

	const deleteContact = (id) =>{
       if(window.confirm("Are you sure you wish to delete this?" === true)){
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

	return ( 
		<>
			{
				!isLoggedin ? <h1 className="mt-3 text-center">You need to login first</h1> :
				<>
					<Container className="mt-3" style={{ display: "flex", justifyContent: "flex-end" }}>
						<Button onClick={openAddGroupModal} style={{marginRight: "5px"}}><FaPlus /> Add group</Button>
						<Button onClick={openAddContactModal}><FaPlus /> Add contact</Button>
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
								{contact.map((contacts, index) =>(
									<tr key={index}>
										<td>{contacts.con_fullName}</td>
										<td>{contacts.con_mobileNumber}</td>
										<td>{contacts.con_officeNumber === "" ? "N/A" : contacts.con_officeNumber}</td>
										<td>{contacts.con_address === "" ? "N/A" : contacts.con_address}</td>
										<td>{contacts.con_email === "" ? "N/A" : contacts.con_email}</td>
										<td>{contacts.con_mobileNumber2 === "" ? "N/A" : contacts.con_mobileNumber2}</td>
										<td className="text-center">
											<Button className="btn-success"onClick={() => (openUpdateModal(contacts.con_id))}>Update</Button>{" "}
											<Button className="btn-danger" onClick={() => (deleteContact(contacts.con_id))}>Delete</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
					
				</>
			}
			<AddContact show={showAddContactModal} onHide={hideAddContactModal} />
			<AddGroup show={showAddGroupModal} onHide={hideAddGroupModal} />
			<UpdateContact show={showUpdateModal} onHide={hideUpdateModal} contactId={contactId} />
		</>
	 );
}
 
export default Home;
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import AddContact from "./AddContact";
import AddGroup from "./AddGroup";

const Home = () => {

	const [isLoggedin, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState("");
	const [contact, setContact] = useState([]);

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

	useEffect(() => {
		if(sessionStorage.getItem("userId") !== null){
			getContact();
		}
	})

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


	return ( 
		<>
			{
				!isLoggedin ? <h1 className="mt-3 text-center">You need to login first</h1> :
				<>
					<Container className="mt-3" style={{ display: "flex", justifyContent: "flex-end" }}>
						<Button onClick={openAddGroupModal} style={{marginRight: "5px"}}><FaPlus /> Add group</Button>
						<Button onClick={() => openAddContactModal()}><FaPlus /> Add contact</Button>
					</Container>

					<Container>
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
										<td>{contacts.con_officeNumber}</td>
										<td>{contacts.con_address}</td>
										<td>{contacts.con_email}</td>
										<td>{contacts.con_mobileNumber2}</td>
										<td className="text-center"><Button className="btn-success">Update</Button>{" "}<Button className="btn-danger">Delete</Button></td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
					
				</>
			}
			<AddContact show={showAddContactModal} onHide={hideAddContactModal} />
			<AddGroup show={showAddGroupModal} onHide={hideAddGroupModal} />
		</>
	 );
}
 
export default Home;
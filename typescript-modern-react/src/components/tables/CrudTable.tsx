import React, { useState } from "react";
import { nanoid } from "nanoid";
import data from "../../mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const CrudTable = () => {
  // useState hooks
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState('');

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  // functions

  // handleFormChange
  const handleAddFormChange = (e: any) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData: any = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  // handleEditFormChange
  const handleEditFormChange = (e: any) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData: any = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // handleFormSubmit
  const handleAddFormSubmit = (e: any) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  // handleEditFormSubmit
  const handleEditFormSubmit = (e: any) => {
    e.preventDefault();

    // New object
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    // newContacts Array
    const newContacts = [...contacts];

    // which row to edit
    const index = contacts.findIndex((contact) => contact.id === editContactId);

    // updated contacts
    newContacts[index] = editedContact;

    // set updated contacts
    setContacts(newContacts);

    // reset ID if done.
    setEditContactId('');
  };

  // handleEditClick
  const handleEditClick = (e: any, contact: any) => {
    e.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  // handleCancelClick
  const handleCancelClick = () => {
    setEditContactId('');
  };

  // handleDeleteClick
  const handleDeleteClick = (contactId: any) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => {
      return contact.id === contactId;
    });

    // finde index and remove 1 element
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <React.Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required
          placeholder="Enter a name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required
          placeholder="Enter an address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required
          placeholder="Enter a phone number"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Enter an email"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default CrudTable;

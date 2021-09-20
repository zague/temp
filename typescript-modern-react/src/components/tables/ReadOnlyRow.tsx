import React from 'react'


const ReadOnlyRow = (props:any) => {
  return (
   
      <tr>
      <td>{props.contact.fullName}</td>
      <td> { props.contact.address } </td>
      <td> { props.contact.phoneNumber } </td>
      <td> {props.contact.email} </td>
      <td>
        <button type="button" onClick={(e) => props.handleEditClick(e, props.contact)}>Edit</button>
        <button type="button" onClick={() => props.handleDeleteClick(props.contact.id)}>Delete</button>
      </td>
    </tr>
   
  )
  
  
};

export default ReadOnlyRow;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDirectory.css";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=5")
      .then((response) => {
        setEmployees(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.login.uuid !== id)
    );
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setEditing(true);
  };

  const handleSave = (employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((prevEmployee) =>
        prevEmployee.login.uuid === employee.login.uuid
          ? employee
          : prevEmployee
      )
    );
    setEditing(false);
    setEmployeeToEdit(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setEmployeeToEdit(null);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.first.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Employee Directory</h1>
      <div className="search">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table">
        <div className="row header">
          <div>ID</div>
          <div>Name</div>
          <div>Age</div>
          <div>Gender</div>
          <div>Location</div>
          <div>Country</div>
          <div>Postcode</div>
          <div>Email</div>
          <div>Username</div>
          <div>Password</div>
          <div>Salt</div>
          <div>MD5</div>
          <div>Phone</div>
          <div>Cell</div>
          <div>Picture</div>
          <div>Nat</div>
          <div>Actions</div>
        </div>

        {filteredEmployees.map((employee) => (
          <div className="row" key={employee.login.uuid}>
            <div>{employee.login.uuid}</div>
            <div>
              {editing && employeeToEdit?.login.uuid === employee.login.uuid ? (
                <input
                  type="text"
                  value={employeeToEdit.name.first}
                  onChange={(event) =>
                    setEmployeeToEdit({
                      ...employeeToEdit,
                      name: {
                        ...employeeToEdit.name,
                        first: event.target.value,
                      },
                    })
                  }
                />
              ) : (
                `${employee.name.title} ${employee.name.first} ${employee.name.last}`
              )}
            </div>
            <div>
              {editing && employeeToEdit?.login.uuid === employee.login.uuid ? (
                <input
                  type="text"
                  value={employeeToEdit.dob.age}
                  onChange={(event) =>
                    setEmployeeToEdit({
                      ...employeeToEdit,
                      dob: { ...employeeToEdit.dob, age: event.target.value },
                    })
                  }
                />
              ) : (
                employee.dob.age
              )}
            </div>
            <div>{employee.gender}</div>
            <div>
              {employee.location.street.number} {employee.location.street.name},{" "}
              {employee.location.city} {employee.location.state}{" "}
              {employee.location.country} {employee.location.postcode}
            </div>
            <div>{employee.location.country}</div>
            <div>{employee.location.postcode}</div>
            <div>{employee.email}</div>
            <div>{employee.login.username}</div>
            <div>{employee.login.password}</div>
            <div>{employee.login.salt}</div>
            <div>{employee.login.md5}</div>
            <div>{employee.phone}</div>
            <div>{employee.cell}</div>
            <div>{employee.picture.thumbnail}</div>
            <div>{employee.nat}</div>
            <div>
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button onClick={() => handleDelete(employee.login.uuid)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;

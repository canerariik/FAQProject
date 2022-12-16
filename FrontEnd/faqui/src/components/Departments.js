import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function Departments() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    list();
  }, []);

  const list = () => {
    axios
      .get("https://localhost:44373/api/DepartmentControllers/List", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("Departments:", res.data);
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [data]
      );
  };

  const addDep = async () => {
    await axios
      .post(
        "https://localhost:44373/api/DepartmentControllers/Create",
        { name: name, code: code },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log("New Department:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const editDep = async (id) => {
    await axios
      .get("https://localhost:44373/api/DepartmentControllers/GetById/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setCode(res.data.code);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDep = async () => {
    await axios
      .post(
        "https://localhost:44373/api/DepartmentControllers/Update",
        { id: id, name: name, code: code },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        editDep();
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const deleteDep = async (id) => {
    await axios
      .get("https://localhost:44373/api/DepartmentControllers/Delete/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log("Deleted Department:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Form style={{ width: "400px" }}>
          <Form.Group className="mb-3" controlId="formBasicDepName">
            <Form.Label>DepartmentName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Department"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDepCode">
            <Form.Label>DepartmentCode:</Form.Label>
            <Form.Control
              type="text"
              placeholder="DepartmentName"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      <ul>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div className="depEditBtn">
            {!isEdit && (
              <button
                class="btn btn-success"
                onClick={() => {
                  addDep();
                }}
              >
                Add Department
              </button>
            )}

            {isEdit && (
              <button
                class="btn btn-warning"
                onClick={() => {
                  updateDep();
                }}
              >
                Update
              </button>
            )}

            {isEdit && (
              <button
                class="btn btn-secondary"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Geri
              </button>
            )}
          </div>
        </div>

        <Table
          className="baslik"
          striped
          bordered
          hover
          size="sm"
          style={{ width: "650px" }}
        >
          <thead>
            <tr>
              <th className="depName">DepartmentsName</th>
              <th className="depCode">DepartmentsCode</th>
            </tr>
          </thead>
        </Table>

        <Table striped bordered hover size="sm">
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <li key={item.id}>
                    <div class="row">
                      <div class="col">
                        <th scope="col">
                          <span className="name">
                            <b>{item.name}</b>
                          </span>
                        </th>
                      </div>
                      <div class="col">
                        <th scope="col">
                          <span className="code">
                            <b>{item.code}</b>
                          </span>
                        </th>
                      </div>

                      <div class="col">
                        <th scope="col">
                          <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => {
                              editDep(item.id);
                              setIsEdit(true);
                              setId(item.id);
                            }}
                          >
                            Edit
                          </button>
                        </th>

                        <th scope="col">
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              deleteDep(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </th>
                      </div>
                    </div>
                  </li>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ul>
    </div>
  );
}

export default Departments;

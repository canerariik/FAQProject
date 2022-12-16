import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Categories() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [parentId, setParentId] = useState("");
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [isParent, setIsParent] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    list();
  }, []);

  const GetSubCat = async (id) => {
    await axios
      .get(
        "https://localhost:44373/api/CategoryControllers/GetSubCatByCatId/" +
          id,
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSubCategory(res.data);
        setParentId(id);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const list = () => {
    axios
      .get("https://localhost:44373/api/CategoryControllers/List", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("Categories:", res.data);
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [data]
      );
  };

  const subList = () => {
    axios
      .get("https://localhost:44373/api/CategoryControllers/SubList", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("SubCategories:", res.data);
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [data]
      );
  };

  const addCat = async () => {
    await axios
      .post(
        "https://localhost:44373/api/CategoryControllers/Create",
        { name: name },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log("New Category:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const addChild = async () => {
    await axios
      .post(
        "https://localhost:44373/api/CategoryControllers/CreateSub",
        { name: name, parentId: parentId },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        // console.log("New Child Category:", res.data);
        // setSubCategory(res.data);
        // setParentId(id);
        GetSubCat(parentId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCat = async (id) => {
    await axios
      .get("https://localhost:44373/api/CategoryControllers/GetById/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setParentId(res.data.parentId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCat = async () => {
    await axios
      .post(
        "https://localhost:44373/api/CategoryControllers/Update",
        { id: id, name: name, parentId: parentId },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        editCat();
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const deleteCat = async (id) => {
    await axios
      .get("https://localhost:44373/api/CategoryControllers/Delete/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log("Deleted Category:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const deleteChild = async (id) => {
    await axios
      .get("https://localhost:44373/api/CategoryControllers/DeleteSub/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        // console.log("Deleted Child Category:", res.data);
        // setSubCategory(res.data);
        // setParentId(res.data.id);
        GetSubCat(parentId);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Form.Group className="mb-3" controlId="formBasicCatName">
            <Form.Label>CategoryName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="catEditBtn">
            {!isEdit && (
              <button
                class="btn btn-success"
                onClick={() => {
                  addCat();
                }}
              >
                Add Category
              </button>
            )}

            {isEdit && (
              <button
                class="btn btn-warning"
                onClick={() => {
                  updateCat();
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
          style={{ width: "250px" }}
        >
          <thead>
            <tr>
              <th className="catName">CategoriesName</th>
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
                          <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => {
                              setIsEdit(true);
                              setId(item.id);
                              editCat(item.id);
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
                              deleteCat(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </th>

                        <th scope="col">
                          <button
                            variant="primary"
                            type="button"
                            class="btn btn-secondary"
                            onClick={() => {
                              GetSubCat(item.id);
                            }}
                          >
                            Details
                          </button>

                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add This Category Child</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <label>ChildName:</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />

                              <button
                                class="btn btn-success"
                                onClick={() => {
                                  addChild();
                                }}
                              >
                                Add Child
                              </button>

                              {subCategory.map((item) => {
                                return (
                                  <Table>
                                    <thead>
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
                                                <button
                                                  type="button"
                                                  class="btn btn-danger"
                                                  onClick={() => {
                                                    deleteChild(item.id);
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                              </th>
                                            </div>
                                          </div>
                                        </li>
                                      </tr>
                                    </thead>
                                  </Table>
                                );
                              })}
                            </Modal.Body>

                            <Modal.Footer>
                              <button variant="secondary" onClick={handleClose}>
                                Close
                              </button>
                            </Modal.Footer>
                          </Modal>
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

export default Categories;

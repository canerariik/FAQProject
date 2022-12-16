import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Questions() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [categoryId, setCatId] = useState("");
  const [departmentId, setDepId] = useState("");

  const [depName, setDepName] = useState("");
  const [catName, setCatName] = useState("");

  const [hdnDepId, setHdnDepId] = useState("");
  const [hdnCatId, setHdnCatId] = useState("");

  const selectChange = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    setDepName(e.nativeEvent.target[index].text);
    setHdnDepId(e.target.value);
  };

  const selectChangeCat = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    setCatName(e.nativeEvent.target[index].text);
    setHdnCatId(e.target.value);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [isEdt, setIsEdt] = useState(false);

  const [answerData, setAnswerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const [show, setShow] = useState(false);
  const [catShow, setCatShow] = useState(false);
  const [depShow, setDepShow] = useState(false);

  const handleDepClose = () => setDepShow(false);
  const handleDepShow = () => setDepShow(true);

  const handleCatClose = () => setCatShow(false);
  const handleCatShow = () => setCatShow(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openDepartmentModal = () => {
    listDep();
    setDepShow(true);
  };

  const openCategoryModal = () => {
    listCat();
    setCatShow(true);
  };

  useEffect(() => {
    list();
  }, []);

  const GetQueByAns = async (id) => {
    await axios
      .get(
        "https://localhost:44373/api/AnswerControllers/GetQueByAnsId/" + id,
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log("QuestionsAns:", res.data);
        setAnswerData(res.data);
        setQuestionId(id);
        setShow(true);
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [data]
      );
  };

  const addAns = async () => {
    await axios
      .post(
        "https://localhost:44373/api/AnswerControllers/Create",
        { name: name, questionId: questionId },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        GetQueByAns(questionId);
        // console.log("New Answer:", res.data);
        // setAnswerData(res.data);
        // setQuestionId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editAns = async (id) => {
    await axios
      .get("https://localhost:44373/api/AnswerControllers/GetById/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setQuestionId(res.data.questionId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAns = async () => {
    await axios
      .post(
        "https://localhost:44373/api/AnswerControllers/Update",
        { id: id, name: name, questionId: questionId },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        editAns();
        GetQueByAns(questionId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAns = async (id) => {
    await axios
      .get("https://localhost:44373/api/AnswerControllers/Delete/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        // console.log("Deleted Answer:", res.data);
        // setAnswerData(res.data);
        // setQuestionId(res.data.id);
        GetQueByAns(questionId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listDep = () => {
    axios
      .get("https://localhost:44373/api/DepartmentControllers/List", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setDepartmentData(res.data);
        console.log("Departments:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetQueByDep = async (id) => {
    await axios
      .get(
        "https://localhost:44373/api/QuestionControllers/GetQueByDepId/" + id,
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setDepartmentData(res.data);
        setDepId(id);
        setDepShow(true);
        listDep(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listCat = () => {
    axios
      .get("https://localhost:44373/api/CategoryControllers/List", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setCategoryData(res.data);
        console.log("Category:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetQueByCat = async (id) => {
    await axios
      .get(
        "https://localhost:44373/api/QuestionControllers/GetQueByCatId/" + id,
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCategoryData(res.data);
        setCatId(id);
        setCatShow(true);
        listCat(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const list = () => {
    axios
      .get("https://localhost:44373/api/QuestionControllers/List", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("Questions:", res.data);
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [data]
      );
  };

  const addQue = async () => {
    await axios
      .post(
        "https://localhost:44373/api/QuestionControllers/Create",
        { name: name, departmentId: hdnDepId, categoryId: hdnCatId },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log("New Question:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const editQue = async (id) => {
    await axios
      .get("https://localhost:44373/api/QuestionControllers/GetById/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log(id);
        setId(res.data.id);
        setName(res.data.name);
        setCatName(res.data.categoryName);
        setDepName(res.data.departmentName);
        setCatId(res.data.categoryId);
        setDepId(res.data.departmentId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateQue = async () => {
    await axios
      .post(
        "https://localhost:44373/api/QuestionControllers/Update",
        {
          id: id,
          name: name,
          categoryId: categoryId,
          departmentId: departmentId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        editQue();
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const deleteQue = async (id) => {
    await axios
      .get("https://localhost:44373/api/QuestionControllers/Delete/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log("Deleted Question:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  return (
    <div>
      <input type="hidden" value={hdnDepId}></input>
      <input type="hidden" value={hdnCatId}></input>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Form style={{ width: "350px" }}>
          <Form.Group className="mb-3" controlId="formBasicQueName">
            <Form.Label>QuestionName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Question"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDepName">
            <Form.Label>DepartmentName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="DepartmentName"
              value={depName}
              onChange={(e) => selectChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCatName">
            <Form.Label>CategoryName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="CategoryName"
              value={catName}
              onChange={(e) => selectChangeCat(e)}
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
          <div className="queEditBtn">
            {!isEdit && (
              <button
                class="btn btn-success"
                onClick={() => {
                  addQue();
                }}
              >
                Add Question
              </button>
            )}

            {isEdit && (
              <button
                class="btn btn-warning"
                onClick={() => {
                  updateQue();
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

          <div className="depModal">
            <button
              variant="primary"
              type="button"
              class="btn btn-primary"
              onClick={() => {
                openDepartmentModal();
              }}
            >
              AddDepartment
            </button>

            <Modal show={depShow} onHide={handleDepClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add This Department</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <select onChange={(e) => selectChange(e)}>
                  <option disabled selected>
                    Select Department
                  </option>
                  {departmentData.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </Modal.Body>

              <Modal.Footer>
                <button variant="secondary" onClick={handleDepClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="catModal">
            <button
              variant="primary"
              type="button"
              class="btn btn-secondary"
              onClick={() => {
                openCategoryModal();
              }}
            >
              AddCategory
            </button>

            <Modal show={catShow} onHide={handleCatClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add This Category</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <select onChange={(e) => selectChangeCat(e)}>
                  <option disabled selected>
                    Select Category
                  </option>
                  {categoryData.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </Modal.Body>

              <Modal.Footer>
                <button variant="secondary" onClick={handleCatClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <Table
          className="baslik"
          striped
          bordered
          hover
          size="sm"
          style={{ width: "950px" }}
        >
          <thead>
            <tr>
              <th className="queName">QuestionsName</th>
              <th className="depName">DepartmentName</th>
              <th className="catName">CategoryName</th>
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
                            <b>{item.questionName}</b>
                          </span>
                        </th>
                      </div>

                      <div class="col">
                        <th scope="col">
                          <span className="depName">
                            <b>{item.departmentName}</b>
                          </span>
                        </th>
                      </div>

                      <div class="col">
                        <th scope="col">
                          <span className="catName">
                            <b>{item.categoryName}</b>
                          </span>
                        </th>
                      </div>

                      <div class="col">
                        <th scope="col">
                          <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => {
                              editQue(item.questionId);
                              setIsEdit(true);
                              setId(item.questionId);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              deleteQue(item.questionId);
                            }}
                          >
                            Delete
                          </button>

                          <button
                            variant="primary"
                            type="button"
                            class="btn btn-info"
                            onClick={() => {
                              GetQueByAns(item.questionId);
                            }}
                          >
                            AddAnswer
                          </button>

                          <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                              <Modal.Title>Add This Answer</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <label>AnswerName:</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />

                              <br />

                              {!isEdt && (
                                <button
                                  class="btn btn-success"
                                  onClick={() => {
                                    addAns();
                                  }}
                                >
                                  Add Answer
                                </button>
                              )}

                              {isEdt && (
                                <button
                                  class="btn btn-warning"
                                  onClick={() => {
                                    updateAns();
                                  }}
                                >
                                  Update
                                </button>
                              )}

                              {isEdt && (
                                <button
                                  class="btn btn-secondary"
                                  onClick={() => {
                                    setIsEdt(false);
                                    debugger;
                                  }}
                                >
                                  Geri
                                </button>
                              )}

                              {answerData.map((item) => {
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
                                                  class="btn btn-warning"
                                                  onClick={() => {
                                                    editAns(item.id);
                                                    setIsEdt(true);
                                                    setId(item.id);
                                                  }}
                                                >
                                                  Edit
                                                </button>
                                              </th>
                                            </div>

                                            <div class="col">
                                              <th scope="col">
                                                <button
                                                  type="button"
                                                  class="btn btn-danger"
                                                  onClick={() => {
                                                    deleteAns(item.id);
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

export default Questions;

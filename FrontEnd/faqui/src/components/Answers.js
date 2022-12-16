import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

function Answers() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    list();
  }, []);

  const list = () => {
    axios
      .get("https://localhost:44373/api/AnswerControllers/List", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("Answers:", res.data);
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
        console.log("New Answer:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
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
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  const deleteAns = async (id) => {
    await axios
      .get("https://localhost:44373/api/AnswerControllers/Delete/" + id, {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log("Deleted Answer:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    list();
  };

  return (
    <div>
      <ul>
        <label>AnswerName:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <label>QuestionId:</label>
        <input
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
        />
        <br />

        {!isEdit && (
          <button
            class="btn btn-success"
            onClick={() => {
              addAns();
            }}
          >
            Add Answer
          </button>
        )}

        {isEdit && (
          <button
            class="btn btn-warning"
            onClick={() => {
              updateAns();
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

        <br />

        <Table className="baslik" striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="ansName">AnswersName</th>
              <th className="queId">QuestionsId</th>
            </tr>
          </thead>
        </Table>

        {data.map((item) => {
          return (
            <Table striped bordered hover size="sm">
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
                          <span className="code">
                            <b>{item.questionId}</b>
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
      </ul>
    </div>
  );
}

export default Answers;

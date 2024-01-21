import React, { useState } from "react";

const data = [
  {
    title: "Angular",
    description: "Some description about the angular",
    topics: [
      "Introduction",
      "Typescript",
      "Why Angular?",
      "Understanding Versions",
      "Fundamentals",
    ],
  },
  {
    title: "Vue",
    description: "Some description about the vue",
    topics: [
      "Introduction",
      "Javascript",
      "Why Vue?",
      "Vue Bindings",
      "Component Interaction",
    ],
  },
];

const App = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [addedAgenda, setAddedAgenda] = useState(data);
  const [topicsArr, setTopicsArr] = useState([]);
  const [showAgendaBlock, setShowAgendaBlock] = useState(false);

  const changeFun = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "newTitle":
        setNewTitle(value);
        break;
      case "newDescription":
        setNewDescription(value);
        break;
      case "newTopic":
        setNewTopic(value);
        break;
      default:
        break;
    }
  };

  const topicFun = () => {
    setTopicsArr((prevTopicsArr) => [...prevTopicsArr, newTopic]);
    setNewTopic("");
  };

  const agendaFun = () => {
    const agenda = {
      title: newTitle,
      description: newDescription,
      topics: topicsArr,
    };
    setNewTitle("");
    setNewDescription("");
    setNewTopic("");
    setTopicsArr([]);
    setAddedAgenda((prevAddedAgenda) => [...prevAddedAgenda, agenda]);
  };

  const formCheck = (e) => {
    e.preventDefault();
  };

  const checkAgendaFun = () => {
    setShowAgendaBlock((prevShowAgendaBlock) => !prevShowAgendaBlock);
  };

  return (
    <div>
      <h1 className="mx-5 mb-5">Agenda Manager</h1>
      {!showAgendaBlock && (
        <div className="container" role="addAgenda">
          <button
            className="btn btn-info"
            onClick={checkAgendaFun}
            role="goToView"
          >
            Click To View Agenda
          </button>
          <form onSubmit={formCheck}>
            <div className="my-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="newTitle"
                placeholder="Enter the title"
                className="form-control"
                role="inputTitle"
                value={newTitle}
                onChange={changeFun}
              />
              <small className="text-danger" datatestid="invalidTitle">
                {newTitle.trim().length === 0 ? "Title is required" : ""}
              </small>
            </div>
            <div className="my-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="newDescription"
                placeholder="Enter the description"
                className="form-control"
                role="inputDescription"
                value={newDescription}
                onChange={changeFun}
              />
              <small className="text-danger" datatestid="invalidDescription">
                {newDescription.trim().length === 0
                  ? "Description is required"
                  : ""}
              </small>
            </div>
            <div className="my-3 w-50">
              <label className="form-label">Enter topic</label>
              <input
                type="text"
                name="newTopic"
                placeholder="Enter the topic"
                className="form-control"
                role="inputTopic"
                value={newTopic}
                onChange={changeFun}
              />
              <small className="text-danger" datatestid="invalidTopic">
                {newTopic.trim().length === 0 && topicsArr.length === 0
                  ? "Topic is required"
                  : ""}
              </small>
            </div>
            <button
              className="btn btn-success addAlign"
              role="addTopicBtn"
              onClick={topicFun}
              disabled={newTopic.trim().length === 0}
            >
              + Add Topic
            </button>
            <button
              className="btn btn-success submitAlign"
              role="submitAgendaBtn"
              onClick={agendaFun}
              disabled={
                newTitle.trim().length === 0 ||
                newDescription.trim().length === 0 ||
                topicsArr.length === 0
              }
            >
              Submit Agenda
            </button>
          </form>
        </div>
      )}
      {topicsArr.length === 0 && (
        <div className="text-danger ml-2 mt-5" datatestid="noTopicsMsg">
          No Topics Added
        </div>
      )}
      {topicsArr.length !== 0 && (
        <div className="card my-3">
          <div className="card-header">Added Topics</div>
          <div className="card-body">
            <ul className="list-group">
              {topicsArr.map((topic) => {
                return (
                  <li className="list-group-item" role="topicList">
                    {topic}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-footer">Refer the topics you added</div>
        </div>
      )}
      {showAgendaBlock && (
        <div className="container" role="viewAgenda">
          <button
            className="btn btn-info"
            role="goToAdd"
            onClick={checkAgendaFun}
          >
            Click To Add Agenda
          </button>
          {addedAgenda.map((agenda, index) => (
            <div className="card my-3" role="cards" key={index}>
              <div className="card-header">{agenda.title}</div>
              <div className="card-body">
                <ul className="list-group">
                  {agenda.topics.map((topic) => {
                    return <li className="list-groupitem">{topic}</li>;
                  })}
                </ul>
              </div>
              <div className="card-footer">{agenda.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

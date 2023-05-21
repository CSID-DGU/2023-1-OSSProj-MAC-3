import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TeamList = ({ handleTeamIdFromChild }) => {
  const [userInfo, setUserInfo] = useState({});
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    fetch("http://localhost:8080/team", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.get_teams)) {
          console.log(data.get_teams);
          setTeams(data.get_teams);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    setNewTeamName(event.target.value);
  };

  const handleAddTeam = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/team", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamName: newTeamName }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-white py-2 collapse-inner rounded">
      <h6 className="collapse-header">팀 목록 :</h6>
      {teams && teams.length > 0 ? (
        teams.map((team, index) => (
          <div key={index}>
            <a
              className="collapse-item"
              onClick={handleTeamIdFromChild(team.teamID)}
            >
              {team.teamName}
            </a>
            {showInput ? (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="새로운 팀명"
                  aria-label="NewTeam"
                  aria-describedby="basic-addon2"
                  value={newTeamName}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-secodary"
                    type="button"
                    onClick={handleAddTeam}
                  >
                    <i className="fas fa-search fa-sm">
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="btn btn-secondary btn-sm"
                style={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "#ccd1d9",
                }}
                onClick={() => setShowInput(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            )}
          </div>
        ))
      ) : (
        <div
          className="btn btn-secondary btn-sm"
          style={{
            width: "100%",
            border: "none",
            backgroundColor: "#ccd1d9",
          }}
          onClick={() => setShowInput(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
    </div>
  );
};

export default TeamList;

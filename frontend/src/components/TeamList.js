import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "../AxiosConfig";

const TeamList = ({ handleTeamIdFromChild }) => {
  const [userInfo, setUserInfo] = useState({});
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    console.log(BASE_URL);
  }, [BASE_URL]);

  const handleInputChange = (event) => {
    setNewTeamName(event.target.value);
  };

  const handleAddTeam = () => {
    console.log(newTeamName);
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .post(
        `${BASE_URL}/team`,
        { teamName: newTeamName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchTeams();
        setNewTeamName("");
        setShowInput(false);
      })
      .catch((error) => {});
  };

  const handleDeleteTeam = (teamID) => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(teamID);
    axios
      .delete(`${BASE_URL}/team/${teamID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchTeams();
      })
      .catch((error) => {});
  };

  const fetchTeams = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);
    axios
      .get(`${BASE_URL}/team`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          throw new Error(showErrorMessages(response.data));
        }
      })
      .then((data) => {
        if (data && Array.isArray(data.get_teams)) {
          console.log(data.get_teams);
          setTeams(data.get_teams);
        }
      })
      .catch((error) => {
        setTeams([]);
        console.log(error);
      });
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };

  const handleClick = (index) => {
    setTeams((prevState) => {
      const updatedTeams = prevState.map((team, i) => {
        if (i === index) {
          return { ...team, isActive: true };
        } else {
          return { ...team, isActive: false };
        }
      });
      return updatedTeams;
    });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleAddTeam();
    }
  };

  return (
    <div className="bg-white py-2 collapse-inner rounded">
      <h6 className="collapse-header">팀 목록 :</h6>
      {teams && teams.length > 0
        ? teams.map((team, index) => {
            return (
              <div
                key={index}
                style={
                  team.isActive
                    ? {
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#eaecf4"
                      }
                    : { display: "flex", alignItems: "center" }
                }
              >
                <a
                  className="collapse-item"
                  onClick={() => {
                    handleTeamIdFromChild(team.teamId);
                    handleClick(index);
                  }}
                  style={{ flex: 1 }}
                >
                  {team.teamName}
                </a>
                <span
                  className="btn"
                  onClick={() => handleDeleteTeam(team.teamId)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            );
          })
        : null}

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
            onKeyDown={handleEnterKey}
          />
          <div className="input-group-append">
            <button
              className="btn btn-secodary btn-user"
              type="button"
              onClick={handleAddTeam}
            >
              <i className="fas fa-search fa-sm">
                <FontAwesomeIcon icon={faPlus} />
              </i>
            </button>
          </div>
          <div
            className="btn btn-secondary btn-sm"
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "#ccd1d9"
            }}
            onClick={() => setShowInput(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      ) : (
        <div
          className="btn btn-secondary btn-sm"
          style={{
            width: "100%",
            border: "none",
            backgroundColor: "#ccd1d9"
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import handleRefreshToken from "./HandleRefreshToken";

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
    fetch(`${BASE_URL}/team`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ teamName: newTeamName }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
        if (response.status === 401) {
          handleRefreshToken().then((result) => {
            if (result) {
              handleAddTeam();
            } else {
              navigate("/");
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        fetchTeams();
        setNewTeamName("");
        setShowInput(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const handleDeleteTeam = (teamID) => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(teamID);
    fetch(`${BASE_URL}/team/${teamID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
        if (response.status === 401) {
          handleRefreshToken().then((result) => {
            if (result) {
              handleDeleteTeam(teamID);
            } else {
              navigate("/");
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        // 삭제된 팀 정보를 업데이트합니다.
        // setTeams((prevTeams) =>
        //   prevTeams.filter((team) => team.teamID !== teamID)
        // );
        fetchTeams();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const fetchTeams = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);
    fetch(`${BASE_URL}/team`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
        if (response.status === 401) {
          handleRefreshToken().then((result) => {
            if (result) {
              fetchTeams();
            } else {
              navigate("/");
            }
          });
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
                        backgroundColor: "#eaecf4",
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
              backgroundColor: "#ccd1d9",
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

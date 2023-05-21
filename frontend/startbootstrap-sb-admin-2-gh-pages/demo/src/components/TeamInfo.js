import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TeamInfo = ({ teamId, handleInviteModalShow }) => {
  const [teamInfo, setTeamInfo] = useState(null);

  const fetchTeam = () => {
    const token = sessionStorage.getItem("token");
    fetch("http://localhost:8080/team/" + teamId.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setTeamInfo(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (teamId.id === 0) return;
    fetchTeam();
  }, [teamId]);

  return (
    <div>
      {/* 팀 구성 정보 */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">팀 구성 정보</h6>
          <div className="dropdown no-arrow">
            <a
              className="dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => {
                if (teamId.id > 0) {
                  handleInviteModalShow(true);
                } else {
                  window.alert("팀을 선택해주세요.");
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </div>
        </div>
        <div className="card-body">
          {teamInfo ? (
            <div
              className="table-responsive project-list"
              style={{ maxHeight: "150px", overflowY: "auto" }}
            >
              <table className="table project-table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">학번</th>
                    <th scope="col">이름</th>
                    <th scope="col">역할</th>
                  </tr>
                </thead>
                <tbody>
                  {teamInfo.teamFellow.map((fellow, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{fellow.studentId}</td>
                      <td>{fellow.name}</td>
                      <td>{fellow.role === "Leader" ? "팀장" : "팀원"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;

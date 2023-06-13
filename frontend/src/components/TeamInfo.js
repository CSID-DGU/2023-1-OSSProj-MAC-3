import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosConfig";

const TeamInfo = ({ teamId, handleInviteModalShow }) => {
  const [teamInfo, setTeamInfo] = useState(null);
  const navigate = useNavigate("/");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchTeam = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .get(`${BASE_URL}/team/${teamId.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
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
        setTeamInfo(data);
      })
      .catch((error) => {});
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
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
              className="dropdown-toggle mr-3"
              role="button"
              onClick={() => {
                if (teamId.id > 0) {
                  fetchTeam();
                } else {
                  window.alert("팀을 선택해주세요.");
                }
              }}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </a>
            <a
              className="dropdown-toggle"
              role="button"
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
        <div className="card-body" style={{ height: "260px" }}>
          {teamInfo ? (
            <div
              className="table-responsive project-list"
              style={{ height: "220px", overflowY: "auto" }}
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

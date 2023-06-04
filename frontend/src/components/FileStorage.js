import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faDownload,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import handleRefreshToken from "./HandleRefreshToken";

const FileStorage = ({
  teamId,
  handleHistoryModalShow,
  handleUploadModalShow,
  handleFileIdFromStorage,
  handleVersionUploadModalShow,
}) => {
  const [fileList, setFileList] = useState(null);
  const [fileDownload, setFileDownload] = useState(null);
  const [fileId, setFileId] = useState(0);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    console.log(fileId);
  }, [fileId]);

  const fetchData = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    fetch(`${BASE_URL}/team/${teamId.id}/file`, {
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
              fetchData();
            } else {
              navigate("/");
            }
          });
        }
      })
      .then((data) => {
        setFileList(data.get_files);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const handleDeleteTeam = (fileID) => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(fileID);
    fetch(`${BASE_URL}/team/${teamId.id}/file/${fileID}`, {
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
              handleDeleteTeam();
            } else {
              navigate("/");
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        // 삭제된 팀 정보를 업데이트합니다.
        setFileList((prevFileLists) =>
          prevFileLists.filter((file) => file.fileID !== fileID)
        );
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  useEffect(() => {
    if (teamId.id === 0) return;
    fetchData();
  }, [teamId]);

  const handleDownloadFile = async (s3Url, fileName) => {
    console.log(s3Url);
    const response = await fetch(s3Url);

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    link.click();
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };
  return (
    <div className="col-xl-8">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">파일 스토리지</h6>
          <div className="dropdown no-arrow">
            <a
              className="dropdown-toggle"
              role="button"
              onClick={() => {
                if (teamId.id > 0) {
                  handleUploadModalShow(true);
                } else {
                  window.alert("팀을 선택해주세요.");
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
            >
              <div className="dropdown-header">Dropdown Header:</div>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>
        {/*<!-- Card Body -->*/}
        <div className="card-body" style={{ height: "500px" }}>
          <div className="chart-area">
            {/*<!--<canvas id="myAreaChart"></canvas>-->*/}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div
                      className="table-responsive project-list "
                      style={{ height: "400px", overflowY: "auto" }}
                    >
                      <table className="table project-table table-centered table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">파일명</th>
                            <th scope="col">수정사항</th>
                            <th scope="col">수정일</th>
                            <th scope="col">작성자</th>
                            <th scope="col"></th>
                            {/*<!--<th scope="col">Action</th>-->*/}
                          </tr>
                        </thead>
                        <tbody>
                          {fileList &&
                            fileList.map((file, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{file.fileName}</td>
                                <td>{file.commitMessage}</td>
                                <td>{file.updateDate}</td>
                                <td>{file.memberName}</td>
                                <td style={{ textAlign: "center" }}>
                                  {/* Action buttons */}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <a
                                    className="btn"
                                    style={{ padding: "0.1rem 0.5rem" }}
                                    onClick={() => {
                                      if (teamId.id > 0) {
                                        handleVersionUploadModalShow(true);
                                        handleFileIdFromStorage(file.fileId);
                                      } else {
                                        window.alert("팀을 선택해주세요.");
                                      }
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </a>
                                  <a
                                    className="btn"
                                    style={{ padding: "0.1rem 0.5rem" }}
                                    onClick={() =>
                                      handleDeleteTeam(file.fileId)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </a>
                                  <a
                                    className="btn"
                                    style={{ padding: "0.1rem 0.5rem" }}
                                    onClick={() =>
                                      handleDownloadFile(
                                        file.s3url,
                                        file.fileName
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon icon={faDownload} />
                                  </a>
                                  <div
                                    className="dropdown no-arrow btn"
                                    style={{
                                      display: "inline",
                                      padding: "0.1rem 0.5rem",
                                    }}
                                  >
                                    <a
                                      className="dropdown-toggle"
                                      role="button"
                                      onClick={() => {
                                        if (teamId.id > 0) {
                                          handleHistoryModalShow(true);
                                          handleFileIdFromStorage(file.fileId);
                                        } else {
                                          window.alert("팀을 선택해주세요.");
                                        }
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faBars} />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileStorage;

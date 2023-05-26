import React, { useState, useEffect } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const HistoryModal = ({
  userInfo,
  teamId,
  fileId,
  historyModalShow,
  handleHistoryModalShow,
}) => {
  const [fileList, setFileList] = useState([]);
  const [newFileName, setFileName] = useState("");
  console.log(historyModalShow);
  const fetchFileList = () => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/file/${fileId.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFileList(data.get_fileVersions);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div
      className={historyModalShow ? "modal-wrapper" : "modal-wrapper hidden"}
    >
      <div className="modal-inner">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">학생 초대</h6>
        </div>
        <div className="card-body">
          {fileList ? (
            <div
              className="table-responsive project-list"
              style={{ maxHeight: "330px", overflowY: "auto" }}
            >
              <table className="table project-table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">파일명</th>
                    <th scope="col">수정사항</th>
                    <th scope="col">수정일</th>
                    <th scope="col">작성자</th>
                  </tr>
                </thead>
                <tbody>
                  {fileList.map((file, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{file.fileName}</td>
                      <td>{file.commitMessage}</td>
                      <td>{file.updateDate}</td>
                      <td>{file.memberName}</td>
                      <td style={{ textAlign: "center" }}>
                        <a className="btn" style={{ padding: "0.1rem 0.5rem" }}>
                          <FontAwesomeIcon icon={faDownload} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="modal-footer flex-row justify-content-around">
          <button className="btn btn-primary col-5">초대</button>
          <button
            className="btn btn-secondary col-5"
            onClick={() => handleHistoryModalShow(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;

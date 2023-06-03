import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const HistoryModal = ({
  userInfo,
  teamId,
  fileId,
  historyModalShow,
  handleHistoryModalShow
}) => {
  const [fileList, setFileList] = useState([]);
  const [newFileName, setFileName] = useState("");

  const navigate = useNavigate();

  console.log(historyModalShow);
  const fetchFileList = () => {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
    fetch(`http://localhost:8080/team/${teamId.id}/file/${fileId.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
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
        if (response.status === 403) {
          alert("로그인이 만료되었습니다.");
          navigate("/");
        }
      })
      .then((data) => {
        setFileList(data.get_fileVersions);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  const handleDownloadFile3 = async (s3Url, fileName) => {
    console.log(s3Url);
    const response = await fetch(s3Url);

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    link.click();
  };

  const handleDownloadFile = async (fileVersionId, fileName) => {
    console.log(fileId);
    const token = sessionStorage.getItem("token");
    fetch(
      `http://localhost:8080/team/${teamId.id}/fileDownload/${fileId.id}/${fileVersionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
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
        if (response.status === 403) {
          alert("로그인이 만료되었습니다.");
          navigate("/");
        }
      })
      .then((data) => {
        console.log(data.s3Url);
        handleDownloadFile3(data.s3Url, fileName);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div
      className={historyModalShow ? "modal-wrapper" : "modal-wrapper hidden"}
    >
      <div className="modal-inner">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">파일 버전 관리</h6>
        </div>
        <div
          className="card-body"
          style={{ height: "350px", overflowY: "auto" }}
        >
          {fileList ? (
            <div
              className="table-responsive project-list"
              style={{ maxHeight: "330px", overflowY: "auto" }}
            >
              <h6
                className="m-0 font-weight-bold"
                style={{ paddingBottom: "10px" }}
              >
                {fileList.length > 0 && fileList[0].fileName}
              </h6>
              <table className="table project-table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">수정사항</th>
                    <th scope="col">수정일</th>
                    <th scope="col">작성자</th>
                  </tr>
                </thead>
                <tbody>
                  {fileList.map((file, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{file.commitMessage}</td>
                      <td>{file.updateDate}</td>
                      <td>{file.memberName}</td>
                      <td style={{ textAlign: "center" }}>
                        <a
                          className="btn"
                          style={{ padding: "0.1rem 0.5rem" }}
                          onClick={() =>
                            handleDownloadFile(
                              file.fileVersionId,
                              file.fileName
                            )
                          }
                        >
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

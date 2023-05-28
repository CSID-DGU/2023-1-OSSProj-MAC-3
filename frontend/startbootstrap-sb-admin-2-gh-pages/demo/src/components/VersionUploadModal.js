import React, { useState, useEffect } from "react";
import "./Modal.css";

const VersionUploadModal = ({
  userInfo,
  teamId,
  versionUploadModalShow,
  handleVersionUploadModalShow,
}) => {
  // const [newFileName, setFileName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!commitMessage || !selectedFile) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const data = {
      commitMessage,
      selectedFile,
    };

    // 파일을 FormData에 추가
    const formData = new FormData();
    formData.append("file", selectedFile);

    formData.append(
      "fileVersionDto",
      new Blob(
        [
          JSON.stringify({
            commitMessage: commitMessage,
            combination: "false",
          }),
        ],
        { type: "application/json" }
      )
    );
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/file/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // 성공적으로 업로드된 후에 수행할 작업
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };

  return (
    <div
      className={
        versionUploadModalShow ? "modal-wrapper" : "modal-wrapper hidden"
      }
    >
      <div className="modal-inner">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">파일 등록</h6>
        </div>
        <div className="card-body">
          <form
            className="form-group"
            id="form1"
            action="uploadFile"
            method="post"
            encType="multipart/form-data"
            target="repacatFrame"
          >
            <div className="mb-3" style={{ marginTop: "10px" }}>
              <input
                className="form-control"
                type="file"
                id="formFile"
                style={{ height: "auto", border: "none" }}
                onChange={(event) => setSelectedFile(event.target.files[0])}
              ></input>
            </div>
          </form>
          <textarea
            className="form-control"
            id="forComment"
            rows={2}
            placeholder="수정사항"
            style={{ marginTop: "10px" }}
            value={commitMessage}
            onChange={(event) => setCommitMessage(event.target.value)}
          ></textarea>
        </div>
        <div className="modal-footer flex-row justify-content-around">
          <button className="btn btn-primary col-5" onClick={handleSubmit}>
            등록
          </button>
          <button
            className="btn btn-secondary col-5"
            onClick={() => handleVersionUploadModalShow(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionUploadModal;
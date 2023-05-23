import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faDownload,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const FileStorage = ({ teamId, handleUploadModalShow }) => {
  const [fileList, setFileList] = useState(null);

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
        <div className="card-body">
          <div className="chart-area">
            {/*<!--<canvas id="myAreaChart"></canvas>-->*/}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive project-list">
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
                          <tr>
                            <th scope="row">1</th>
                            <td>OSS 착수</td>
                            <td>서론 작성</td>
                            <td>02/5/2019</td>
                            <td>김동국</td>
                            <td style={{ textAlign: "center" }}>
                              <a
                                className="btn"
                                style={{ padding: "0.1rem 0.5rem" }}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </a>
                              <a
                                className="btn"
                                style={{ padding: "0.1rem 0.5rem" }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </a>
                              <a
                                className="btn"
                                style={{ padding: "0.1rem 0.5rem" }}
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
                                  href="#"
                                  role="button"
                                  id="dropdownMenuLink"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <FontAwesomeIcon icon={faBars} />
                                </a>
                                <div
                                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                  aria-labelledby="dropdownMenuLink"
                                >
                                  <div className="dropdown-header">
                                    Dropdown Header:
                                  </div>
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
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>OSS 착수</td>
                            <td>서론 작성</td>
                            <td>02/5/2019</td>
                            <td>김동국</td>
                            <td style={{ textAlign: "center" }}>
                              <a
                                className="btn"
                                style={{ padding: "0.1rem 0.5rem" }}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </a>
                              <a
                                className="btn"
                                style={{ padding: "0.1rem 0.5rem" }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </a>
                              <a
                                className="btn"
                                style={{ padding: "0.1rem 0.5rem" }}
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
                                  href="#"
                                  role="button"
                                  id="dropdownMenuLink"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <FontAwesomeIcon icon={faBars} />
                                </a>
                                <div
                                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                  aria-labelledby="dropdownMenuLink"
                                >
                                  <div className="dropdown-header">
                                    Dropdown Header:
                                  </div>
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
                            </td>
                          </tr>
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

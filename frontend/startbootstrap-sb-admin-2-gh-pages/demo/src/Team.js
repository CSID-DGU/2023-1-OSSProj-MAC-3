import "./bootstrap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

function DropdownButton({ label, content, style }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <a className={`dropdown-button ${style}`} onClick={toggleDropdown}>
        {label}
      </a>
      {isOpen && <div>{content}</div>}
    </div>
  );
}

function Team() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    //localStorage.removeItem("token");
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 상태를 반전시킴
  };

  return (
    <div id="wrapper">
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <img
            className="login-dongguk-logo"
            src={`${process.env.PUBLIC_URL}/dongguk_logo.png`}
          />
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - 메인 페이지 -->*/}
        <li className="nav-item active">
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link collapsed dropdown-button">
              {/*<!--<i className="fas fa-fw fa-tachometer-alt"></i>-->*/}
              <div style={{ textAlign: "center" }}>
                <span>메인 페이지</span>
              </div>
            </a>
          </li>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - 팀 활동 페이지 -->*/}
        <li className="nav-item active">
          <li className="nav-item dropdown no-arrow mx-1">
            <DropdownButton
              label={
                <div style={{ textAlign: "center" }}>
                  <i class="fas fa-fw fa-cog"></i>
                  <span>팀 활동 페이지</span>
                </div>
              }
              content={
                <div className="collapse" style={{ display: "block" }}>
                  <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">팀 목록 :</h6>
                    <a class="collapse-item">
                      {/*href="buttons.html">*/}
                      오픈소스
                    </a>
                    <a class="collapse-item">MAC</a>
                    <div
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "#ccd1d9",
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                </div>
              }
              style="nav-link collapsed"
            />
          </li>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}
      {/*<!-- Content Wrapper -->*/}
      <div id="content-wrapper" className="d-flex flex-column">
        {/*<!-- Main Content -->*/}
        <div id="content">
          {/*<!-- Topbar -->*/}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/*<!-- Sidebar Toggle (Topbar) -->*/}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/*<!-- Topbar Search -->*/}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <h1 className="h4 mb-0 text-gray-800">
                  오픈소스소프트웨어프로젝트
                </h1>
              </div>
            </form>

            {/*<!-- Topbar Navbar -->*/}
            <ul className="navbar-nav ml-auto">
              {/*<!-- Nav Item - Alerts -->*/}

              <li className="nav-item dropdown no-arrow mx-1">
                <DropdownButton
                  label={
                    <div>
                      <FontAwesomeIcon icon={faBell} />
                      {/* Counter - Alerts */}
                      <span className="badge badge-danger badge-counter">
                        3+
                      </span>
                    </div>
                  }
                  content={
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="alertsDropdown"
                      style={{ display: "block" }}
                    >
                      <h6 className="dropdown-header">
                        <span>김동국(2023000002)</span>
                        님이
                        <span>MAC</span>
                        팀에
                        <span>홍길동</span>
                        님을 초대하셨습니다.
                      </h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div
                          className="btn btn-secondary btn-sm"
                          style={{
                            width: "100%",
                            backgroundColor: "#fc9a9d",
                            border: "none",
                          }}
                        >
                          수락
                        </div>
                        <div
                          className="btn btn-secondary btn-sm"
                          style={{
                            width: "100%",
                            backgroundColor: "#9abbfc",
                            border: "none",
                          }}
                        >
                          거절
                        </div>
                      </a>
                    </div>
                  }
                  style="nav-link dropdown-toggle"
                />
              </li>
              {/*<!-- Nav Item - User Information -->*/}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    김동국(2023000001)
                  </span>
                  {/*<!-- <span style="padding-right: 5px"> -->*/}
                  <div className="btn btn-primary btn-user">My Page</div>
                  <div
                    className="btn btn-primary btn-user"
                    style={{ marginLeft: "5px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          {/*<!-- End of Topbar -->*/}

          {/*<!-- Begin Page Content -->*/}
          <div className="container-fluid">
            {/*<!-- Page Heading -->*/}
            <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

            {/*<!-- Content Row -->*/}

            <div className="row">
              {/*<!-- 파일 스토리지 섹션 -->*/}
              <div className="col-xl-8">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      파일 스토리지
                    </h6>
                    <div className="dropdown no-arrow">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
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
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Action
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Another action
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
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
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Action
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Another action
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
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

              <div className="col-xl-4 mb-4">
                {/*<!-- 팀 구성 정보 -->*/}
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      팀 구성 정보
                    </h6>
                    <div className="dropdown no-arrow">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
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
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">20230001 김동국</li>

                      <li className="list-group-item">20230001 김건국</li>
                    </ul>
                  </div>
                </div>
                {/*<!--공지사항-->*/}
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      공지 사항
                    </h6>
                    <div className="dropdown no-arrow">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
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
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">착수 보고 데드라인</li>
                    </ul>
                  </div>

                  {/*<!-- Pie Chart -->*/}
                </div>
              </div>
              {/*<!-- /.container-fluid -->*/}
            </div>
            {/*<!-- End of Main Content -->*/}

            {/*<!-- Footer -->*/}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
            {/*<!-- End of Footer -->*/}
          </div>
          {/*<!-- End of Content Wrapper -->*/}
        </div>
      </div>
    </div>
  );
}

export default Team;

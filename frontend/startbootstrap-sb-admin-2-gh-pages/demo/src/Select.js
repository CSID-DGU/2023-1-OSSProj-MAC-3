import "./bootstrap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Select() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("after login token:\n" + token);
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
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const goTeam = () => {
    navigate("/team");
  };

  return (
    <div className="container-mine container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div
            className="card o-hidden border-0 shadow-lg my-5"
            style={{ height: "478.2px" }}
          >
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row" style={{ height: "100%", marginRight: 0 }}>
                {/* <!--과목 선택 화면 좌측에 로고, 사용자 정보, 마이페이지 버튼, 로그아웃 버튼 배치--> */}
                <div className="col-lg-6">
                  <div className="p-5 py-5">
                    {/* <!--동국대 로고 배치--> */}
                    <img
                      className="login-dongguk-logo mb-4"
                      src={`${process.env.PUBLIC_URL}/dongguk_logo.jpg`}
                      alt="..."
                    />
                    {/* <!--이클래스임을 설명하는 텍스트 배치--> */}
                    <h1 className="h5 text-gray-900 mb-4">
                      동국대학교 이클래스
                    </h1>
                    <div className="p-1">
                      {/* <!--사용자 이름, 학번 정보--> */}
                      <span className="mr-2 d-none d-lg-inline text-gray-800 small border-right-0">
                        {`${userInfo.name}(${userInfo.studentId})`}님
                      </span>
                      {/* <!--마이페이지 버튼--> */}
                      <a
                        href="index.html"
                        className="btn btn-primary btn-user"
                        style={{ width: "55%" }}
                      >
                        My Page
                      </a>
                      {/* <!--로그아웃 버튼--> */}
                    </div>
                    <div className="p-1 py-3">
                      <a
                        className="btn btn-primary btn-user btn-block"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!--과목 선택 화면 우측에 과목 선택 섹션 배치--> */}
                <div className="p-3 col-lg-6" style={{ height: "100%" }}>
                  <div
                    className="p-1 border border-secondary"
                    style={{ height: "100%", borderRadius: "10%" }}
                  >
                    <div className="p-5">
                      {/* <!--과목 선택 섹션임을 알려주는 텍스트 배치--> */}
                      <h1 className="h5 text-gray-900 mb-4">내 강의실</h1>
                      {/* <!--과목 선택 버튼--> */}
                      <form className="user">
                        <div className="form-group">
                          <a
                            className="btn btn-primary btn-user btn-block"
                            onClick={goTeam}
                          >
                            오픈소스소프트웨어실습
                          </a>
                        </div>
                        <div className="form-group">
                          <a className="btn btn-primary btn-user btn-block">
                            오픈소스소프트웨어프로젝트
                          </a>
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                          </div>
                        </div>
                        <hr />
                      </form>
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
}

export default Select;

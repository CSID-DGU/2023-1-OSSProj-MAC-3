import "../bootstrap.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosConfig";

const Join = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dept, setDept] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !studentId || !dept || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const data = {
      name,
      studentId,
      dept,
      password
    };

    axios
      .post(`${BASE_URL}/user/signup`, data)
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
        alert("회원가입이 완료되었습니다.");
        goLogin();
      })
      .catch((error) => {});
  };

  const movePage = useNavigate();

  function goLogin() {
    movePage("/login");
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div>
                      <img
                        className="signup-dongguk-logo mb-4"
                        src={`${process.env.PUBLIC_URL}/dongguk_logo.jpg`}
                        style={{ width: "40%" }}
                        alt="..."
                      />
                    </div>
                    <h1 className="h5 text-gray-900 mb-4">
                      동국대학교 회원가입
                    </h1>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="signupInputName"
                          aria-describedby="nameHelp"
                          placeholder="Name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="signupInputID"
                          aria-describedby="idHelp"
                          placeholder="Student ID"
                          value={studentId}
                          onChange={(event) => setStudentId(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="signupInputDept"
                          aria-describedby="deptHelp"
                          placeholder="Department"
                          value={dept}
                          onChange={(event) => setDept(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="signupInputPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                      <button
                        id="loginButton"
                        className="btn btn-primary btn-user btn-block"
                        type="submit"
                      >
                        Join
                      </button>
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
  );
};

export default Join;

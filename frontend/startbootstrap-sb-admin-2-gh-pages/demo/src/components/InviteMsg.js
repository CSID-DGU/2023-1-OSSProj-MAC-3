import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class InviteMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("http://localhost:8080/team", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.get_teams)) {
          this.setState({ teams: data.get_teams });
        }
      })
      .catch((error) => console.log(error));
  }
  handleInputChange = (event) => {
    this.setState({ newTeamName: event.target.value });
  };
  handleAddTeam = () => {
    const { newTeamName } = this.state;
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/team", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamName: newTeamName }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
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
        <a className="dropdown-item d-flex align-items-center" href="#">
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
    );
  }
}
export default InviteMsg;

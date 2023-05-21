import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class TeamList extends Component {
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
    const { teams, newTeamName, showInput } = this.state;

    return (
      <div className="bg-white py-2 collapse-inner rounded">
        <h6 className="collapse-header">팀 목록 :</h6>
        {teams && teams.length > 0 ? (
          teams.map((team, index) => (
            <div key={index}>
              <a className="collapse-item">{team.teamName}</a>
              {showInput ? (
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="새로운 팀명"
                    aria-label="NewTeam"
                    aria-describedby="basic-addon2"
                    value={newTeamName}
                    onChange={this.handleInputChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secodary"
                      type="button"
                      onClick={this.handleAddTeam}
                    >
                      <i className="fas fa-search fa-sm">
                        <FontAwesomeIcon icon={faPlus} />
                      </i>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="btn btn-secondary btn-sm"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#ccd1d9",
                  }}
                  onClick={() => this.setState({ showInput: true })}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            className="btn btn-secondary btn-sm"
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "#ccd1d9",
            }}
            onClick={() => this.setState({ showInput: true })}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
      </div>
    );
  }
}
export default TeamList;

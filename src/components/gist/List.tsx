import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import BadgesSection from "./BadgesSection";
import { GitService } from "./GitService";
import { Gist } from "./models/Gist";
import { throttle } from "lodash";
import ForkUserSection from "./ForkUserSection";

export interface IFormState {
  username: string;
  gists: Gist[];
  isLoading: boolean;
}

class List extends React.Component<
  RouteComponentProps<{ username: string }>,
  IFormState
> {
  private gistService = new GitService();
  onUsernameThrottled: any;
  constructor(props: RouteComponentProps<{ username: string }>) {
    super(props);
    this.state = {
      username: "",
      gists: [],
      isLoading: false,
    };

    this.onUsernameThrottled = throttle(this.handleInputChanges, 200);
  }

  componentWillUnmount(): void {
    this.onUsernameThrottled.cancel();
  }

  componentDidMount() {
    // TODO: Not needed for now.
  }

  getDataFromAPI = async (): Promise<void> => {
    if (!this.state.username) {
      return;
    }
    const gists = await this.gistService.getGistDataByUsername(
      this.state.username
    );
    this.setState({ gists });
  };

  handleInputChanges = (username: string) => {
    console.log("e.currentTarget.value", username);
    this.setState({ username }, this.getDataFromAPI);
  };

  render() {
    const { gists, username, isLoading } = this.state;
    return (
      <div className="App">
        <h1> Public Gists List</h1>
        <div className={"col-md-12 form-wrapper"}>
          <form id={"create-post-form"} noValidate={true}>
            <div className="form-group col-md-12">
              <input
                type="text"
                id="username"
                defaultValue={this.state.username}
                onChange={({ target: { value } }) =>
                  this.onUsernameThrottled(value)
                }
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                name="Username"
                className="form-control"
                placeholder="Enter username"
              />
            </div>
          </form>
        </div>
        {!username && (
          <div className="container">
            <div className="row">Waiting for your input.</div>
          </div>
        )}
        {isLoading && (
          <div className="container">
            <div className="row">Please wait...</div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Files</th>
                  <th scope="col">Fork Users</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {gists &&
                  gists.length &&
                  gists.map((gist) => (
                    <tr key={gist.id}>
                      <BadgesSection files={gist.files}></BadgesSection>
                      <ForkUserSection {...gist}></ForkUserSection>
                      <td>{gist?.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(List);

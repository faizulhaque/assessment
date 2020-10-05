import React from "react";
import { GitService } from "./GistService";
import { ForkUser } from "./models/Gist";

export interface IForkUserProps {
  forks_url: string;
  id: string;
}

export interface IForkUserState {
  isLoading: boolean;
  users: string;
}

class ForkUserSection extends React.Component<IForkUserProps, IForkUserState> {
  private gistService = new GitService();
  constructor(props: IForkUserProps) {
    super(props);
    this.state = {
      isLoading: props.forks_url ? true : false,
      users: props.forks_url ? "" : "-",
    };
  }

  async componentDidMount() {
    if (!this.props.forks_url) {
      return;
    }
    const response = await this.gistService.getForkUsersDataByUrl(
      this.props.forks_url
    );
    let users: string = "-";
    if (response && response.length) {
      users = response
        .map((forkUser: ForkUser) => {
          return forkUser.owner?.login;
        })
        .join(", ");
    }
    this.setState({
      users,
      isLoading: false,
    });
  }

  render() {
    return (
      <td>{this.state.isLoading ? "Please wait..." : this.state.users}</td>
    );
  }
}

export default ForkUserSection;

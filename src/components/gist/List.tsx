import Axios from "axios";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Badges from "./Badges";
import ForkUser from "./ForkUser";

export interface IGists {
    [key: string]: any;
}
export interface IFormState {
    username: string,
    gists: IGists[];
}

class List extends React.Component<RouteComponentProps<{ username: string }>, IFormState> {
    constructor(props: RouteComponentProps<{ username: string }>) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            gists: [],
        }
    }

    async componentDidMount() {
        const { username } = this.state;
        const response = await Axios.get(`https://api.github.com/users/${username}/gists`);
        this.setState({ gists: response.data });
    }

    // private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    //     e.preventDefault();
    //     this.setState({ loading: true });
    //     Axios.patch(`http://localhost:5000/customers/${this.state.username}`, this.state.values).then(data => {
    //         this.setState({ submitSuccess: true, loading: false })
    //         setTimeout(() => {
    //             this.props.history.push('/');
    //         }, 1500)
    //     })
    // }

    private setValues = (values: IGists) => {
        this.setState({ gists: { ...this.state.gists, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ username: e.currentTarget.value })
    }

    render() {
        const { gists } = this.state;
        return (
            <div className="App">
                < h1 > Public Gists List</h1>
                <div className={"col-md-12 form-wrapper"}>
                    <form id={"create-post-form"} noValidate={true}>
                        <div className="form-group col-md-12">
                            <input type="text" id="first_name" defaultValue={this.state.username} onChange={(e) => this.handleInputChanges(e)} name="Username" className="form-control" placeholder="Enter username" />
                        </div>
                    </form>
                </div>
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
                                {gists && gists.map(gist =>
                                    <tr key={gist.id}>
                                        <Badges files={gist.files}></Badges>
                                        <ForkUser url={gist.forks_url}></ForkUser>
                                        <td>{gist.description}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(List)
import React from "react";

interface IForkUserProps {
    url: string;
}

class ForkUser extends React.Component<IForkUserProps> {
    componentDidMount() {

    }

    render() {
        return <td>{this.props.url}</td>
    }
}

export default ForkUser;
import React from "react";

interface IBadgeProps {
    files: { [key: string]: any; };
}

class Badges extends React.Component<IBadgeProps>{
    public render() {
        const { files } = this.props;
        return <td>{Object.keys(files).reduce((p, filename) => `${p},${files[filename].filename}`)}</td>
    }
}

export default Badges;
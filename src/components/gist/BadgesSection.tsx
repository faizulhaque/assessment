import React from "react";

export interface IBadgeProps {
  files: { [key: string]: any };
}

const BadgesSection = (props: IBadgeProps): React.ReactElement => {
  const { files } = props;
  return (
    <td className="td-for-filename">
      {Object.keys(files).reduce(
        (p, filename) => `${p},${files[filename].filename}`
      )}
    </td>
  );
};

export default BadgesSection;

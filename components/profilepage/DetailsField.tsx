import React from 'react';

interface DetailsFieldProps {
  content: string;
}

const DetailsField: React.FC<DetailsFieldProps> = (props) => {
  return (
    <div>
      <div className="tired">{props.content}</div>
    </div>
  );
};

export default DetailsField;

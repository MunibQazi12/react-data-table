import css from './ActionsColumn.module.css';
import { useState } from 'react';

interface ColumnActionProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

const ColumnAction = ({ icon, label, onClick }: ColumnActionProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className={css.action}
      onMouseEnter={() => {
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
      onClick={() => {
        setShowTooltip(false);
        onClick();
      }}
    >
      {icon}
      <div
        className={`tooltip ${css.tooltip} ${
          showTooltip ? 'scale-100' : 'scale-0'
        }`}
        onMouseEnter={() => {
          setShowTooltip(false);
        }}
      >
        {label}
      </div>
    </div>
  );
};

const ActionsColumn = ({ actions }: { actions: ColumnActionProps[] }) => {
  return (
    <div className={css.actions}>
      {actions.map((action, index) => (
        <ColumnAction key={index} {...action} />
      ))}
    </div>
  );
};

export default ActionsColumn;

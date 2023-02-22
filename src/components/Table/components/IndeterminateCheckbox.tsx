import css from '../styles/table.module.css';
import { GiCheckMark } from 'react-icons/gi';
import { FaMinus } from 'react-icons/fa';

interface Props {
  checked?: boolean;
  indeterminate?: boolean;
  onChange: (event: unknown) => void;
}

export const IndeterminateCheckbox = ({
  checked,
  indeterminate,
  onChange,
}: Props) => {
  return (
    <div
      className={css.checkboxDiv}
      onClick={e => {
        onChange(e);
      }}
    >
      <input
        type='checkbox'
        checked={checked}
        className={`${css.selectCheckbox}`}
        readOnly={true}
      />
      <FaMinus
        className={`${css.selectCheckboxIndeterminate} ${
          indeterminate ? css.selectCheckboxIndeterminateShow : null
        }`}
      />
      <GiCheckMark
        className={`${css.checkboxIcon} ${
          checked ? css.checkboxIconShow : null
        }`}
      />
    </div>
  );
};

import css from './BooleanColumn.module.css';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

const BooleanColumn = ({ value }: { value: boolean }) => {
  return (
    <div className={css.booleanContainer}>
      {value ? (
        <MdCheckCircle size={30} className={css.booleanTrue} />
      ) : (
        <MdCancel size={30} className={css.booleanFalse} />
      )}
    </div>
  );
};

export default BooleanColumn;

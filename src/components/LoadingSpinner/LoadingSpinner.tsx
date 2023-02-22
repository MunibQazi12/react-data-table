import ClipLoader from 'react-spinners/ClipLoader';
import css from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={css.wrapper}>
      <ClipLoader className={css.center} color={'#88be5d'} size={50} />
    </div>
  );
};

export default LoadingSpinner;

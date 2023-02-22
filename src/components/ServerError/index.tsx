import css from './style.module.css';

export const ServerError = () => {
  return (
    <div className={css.container}>
      <div className={css.title}>Server Error</div>
      <div className={css.content}>Please refresh page or come back later</div>
    </div>
  );
};

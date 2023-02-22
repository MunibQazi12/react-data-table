import css from '../styles/table.module.css';

interface Props {
  getResizeHandler: () => (event: unknown) => void;
  getIsResizing: () => boolean;
}

export function HeaderResize({ getResizeHandler, getIsResizing }: Props) {
  return (
    <div
      {...{
        onMouseDown: getResizeHandler(),
        onTouchStart: getResizeHandler(),
        className: `${css.resizer} ${getIsResizing() ? css.isResizing : ''}`,
      }}
    ></div>
  );
}

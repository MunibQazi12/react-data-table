import css from './StatusColumn.module.css';

interface Props {
  value: string;
  colorCombos: ColorCombo[];
}

interface ColorCombo {
  value: string;
  color: 1 | 2 | 3 | 4 | 5 | 6 | 'red' | 'green';
}

const StatusColumn = ({ value, colorCombos }: Props) => {
  if (!value) {
    return <></>;
  }

  const combo = colorCombos.find(colorCombo => colorCombo.value === value);

  if (!combo) {
    return <></>;
  }

  let cssClass;
  switch (combo.color) {
    case 1:
      cssClass = css.c1;
      break;
    case 2:
      cssClass = css.c2;
      break;
    case 3:
      cssClass = css.c3;
      break;
    case 4:
      cssClass = css.c4;
      break;
    case 5:
      cssClass = css.c5;
      break;
    case 6:
      cssClass = css.c6;
      break;
    case 'red':
      cssClass = css.red;
      break;
    case 'green':
      cssClass = css.green;
      break;
  }

  return <div className={`${css.container} ${cssClass}`}>{value}</div>;
};

export default StatusColumn;

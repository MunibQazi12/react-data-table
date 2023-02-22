import { priceToString } from 'utils/formatters/priceToString';
import css from './PriceColumn.module.css';

const PriceColumn = ({ value }: { value: number }) => {
  return <div className={css.container}>{priceToString(value)}</div>;
};

export default PriceColumn;

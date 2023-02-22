import { useEffect, useState } from 'react';
import css from './styles.module.css';

// A debounced input react component
export function FilterField({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={css.inputContainer}>
      <input
        {...props}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`${css.filterInput} ${
          props.type === 'text' ? css.textFilter : css.rangeFilter
        }`}
      />
    </div>
  );
}

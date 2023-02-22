// import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiDragMove2Line } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import css from '../styles/table.module.css';

interface Props {
  showMenu: boolean,
  setShowMenu: Function
}
export const HeaderMenu = ({ showMenu, setShowMenu }: Props) => {

  const dropdownRef = useRef<HTMLInputElement>(null);
  // const toggleMenu = () => {
  // setShowMenu(!showMenu);
  // };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current?.contains(target as Node)) {
      setShowMenu(false);
    }
  };

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      {/* <BsThreeDotsVertical size={14} onClick={toggleMenu} /> */}
      <RiDragMove2Line size={14} />
      {showMenu && (
        <div className={css.dropdownList}>
          <ul>
            <li>Hide</li>
            <li>Freeze Left</li>
            <li>Freeze Right</li>
            <li>Unfreeze</li>
            <li>Sort Assending</li>
            <li>Sort Desending</li>
            <li>Unsort</li>
          </ul>
        </div>
      )}
    </div>
  );
};

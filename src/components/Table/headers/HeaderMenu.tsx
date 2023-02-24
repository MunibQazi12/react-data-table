// import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useRef, useState } from "react";
import css from "../styles/table.module.css";

interface Props {
  showMenu: boolean;
  setShowMenu: Function;
  onClickMenuOption: Function;
  headerId: string;
  isFixed: boolean | string;
  activeOption?: string
}

const menuOptions = [
  "Hide",
  "Freeze Left",
  "Freeze Right",
  "Unfreeze",
  "Sort Assending",
  "Sort Desending",
  "Unsort",
  "Move Left",
  "Move Right",
  "Move Start",
  "Move End",
];
export const HeaderMenu = ({
  showMenu,
  setShowMenu,
  onClickMenuOption,
  headerId,
  isFixed,
  activeOption
}: Props) => {
  const dropdownRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current?.contains(target as Node)) {
      setShowMenu(false);
    }
  };
  
  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <div className={css.dropdownList}>
        <ul>
          {menuOptions.map((option: string, index: number) => {
            return (
              <li
                className={`${activeOption === option ? "disable" : "enable"}`}
                onClick={(e) => {
                  setShowMenu(false);
                  e.stopPropagation();
                  onClickMenuOption({
                    action: option,
                    column: headerId,
                    index: index,
                  });
                }}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <BsThreeDotsVertical size={14} onClick={toggleMenu} /> */}
      {/* {!isFixed && <RiDragMove2Line size={14} />} */}
      {/* {showMenu && ( */}
      {/* <ToolTip content={
       
       } />
        </ToolTip>  */}
    </div>
  );
};

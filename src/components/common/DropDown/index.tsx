import React, { useState } from 'react';
import DropDown from './DropDown';
import { DropDownContainerProps, DropDownDirections } from './types';

const DropDownContainer: React.FC<DropDownContainerProps> = ({
  trigger,
  children,
  direction = DropDownDirections.RIGHT,
  onAppear,
  onDisappear,
  onAppearStart,
  onDisappearStart,
  delay,
  hover,
}) => {
  const [show, setShow] = useState(false);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const displayMenuItem = () => {
    if (timer) clearTimeout(timer);
    if (onAppearStart) onAppearStart();
    setShow(true);
    if (onAppear) onAppear();
  };

  const makeDisappear = () => {
    const timerFunc = () =>
      setTimeout(() => {
        setShow(false);
        if (onDisappear) onDisappear();
      }, delay || 0);
    setTimer(timerFunc());
    if (onDisappearStart) onDisappearStart();
  };

  const handleAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (show) {
      makeDisappear();
    } else {
      displayMenuItem();
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hover && !show) {
      handleAction(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hover && show) {
      handleAction(e);
    }
  };

  const getStyleObject = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (direction === DropDownDirections.RIGHT) {
      style.right = 0;
    } else {
      style.left = 0;
    }
    return style;
  };

  return (
    <DropDown
      handleMouseOver={handleMouseOver}
      handleMouseLeave={handleMouseLeave}
      handleClick={handleAction}
      show={show}
      trigger={trigger}
      style={getStyleObject()}
    >
      {children}
    </DropDown>
  );
};

export default DropDownContainer;
import React, { useEffect, useRef, useState } from 'react';

const number = [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2];

const oneNumberHeight = 94;
const oneLoopHeight = oneNumberHeight * 10;
const offsetNumber = 2;

export const KeylockNumber = (props: {
  position: number;
  number: number;
  startMove: () => void;
  endMove: () => void;
  moveY: (deltaY: number) => void;
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      const current = containerRef.current as any;
      current.isGrabbing = false;
      current.cursorY = 0;

      const mouseDownHandler = (evt: any) => {
        console.log('MOUSEDOWN', props.position);
        current.isGrabbing = true;
        current.cursorY = evt.clientY;
        props.startMove();
      };
      current.addEventListener('mousedown', mouseDownHandler);

      const mouseUpHandler = () => {
        if (current.isGrabbing) {
          current.isGrabbing = false;
          props.endMove();
        }
      };
      window.addEventListener('mouseup', mouseUpHandler);

      const mouseMoveHandler = (evt: any) => {
        if (current.isGrabbing) {
          props.moveY(current.cursorY - evt.clientY);
        }
      };
      window.addEventListener('mousemove', mouseMoveHandler);

      return () => {
        current.removeEventListener('mousedown', mouseDownHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
        window.removeEventListener('mousemove', mouseMoveHandler);
      };
    }
  }, [containerRef.current]);
  return (
    <div
      ref={containerRef}
      style={{
        cursor: 'grab',
        width: '80px',
        textAlign: 'center',
        userSelect: 'none',
        borderBottom: '1px #DDD solid',
        borderTop: '1px #DDD solid',
      }}
    >
      <label
        style={{
          cursor: 'grab',
        }}
      >
        {props.number}
      </label>
    </div>
  );
};
export const KeylockNumberSet = (props: {
  position: number;
  initialNumber: number;
}) => {
  const containerRef = useRef(null);
  const startMove = () => {
    const current = containerRef.current as any;
    current.startTop = parseInt(current.style.top.replace('px', ''));
  };
  const endMove = () => {
    const current = containerRef.current as any;
    const currentTop = parseInt(current.style.top.replace('px', ''));
    let currentlySelectedNumber =
      -offsetNumber + Math.abs(currentTop) / oneNumberHeight;
    if (currentlySelectedNumber - Math.floor(currentlySelectedNumber) > 0.5) {
      currentlySelectedNumber += 1;
    }
    currentlySelectedNumber = Math.floor(currentlySelectedNumber);

    current.style.top = `-${
      (offsetNumber + currentlySelectedNumber) * oneNumberHeight
    }px`;
  };
  const moveY = (deltaY: number) => {
    const current = containerRef.current as any;
    let topAfterMove = (current.startTop - deltaY) % oneLoopHeight;
    if (topAfterMove > 0) {
      topAfterMove -= oneLoopHeight;
    }
    current.style.top = `${topAfterMove}px`;
  };
  useEffect(() => {
    if (containerRef.current) {
      const current = containerRef.current as any;
      const topValue = (offsetNumber + props.initialNumber) * oneNumberHeight;
      // current.style.top = `${
      //
      // } px`;
      current.style.setProperty('top', `-${topValue}px`);
    }
  }, [containerRef.current]);

  return (
    <div
      style={{
        width: '80px',
        fontSize: '80px',
        position: 'relative',
        marginRight: '2px',
        marginLeft: '2px',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
        }}
      >
        {number.map((n, i) => (
          <KeylockNumber
            key={`${props.position}.${i}`}
            position={props.position}
            number={n}
            startMove={startMove}
            endMove={endMove}
            moveY={moveY}
          />
        ))}
      </div>
    </div>
  );
};
export const Keylock = () => {
  const [stateNumber, setStateNumber] = useState('948175');
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          border: '4px #E9E9E9 solid',
        }}
      >
        <div
          style={{
            paddingTop: '8px',
            paddingBottom: '8px',
            display: 'flex',
            fontFamily: 'Courier New',
            height: `${oneNumberHeight}px`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <KeylockNumberSet
            position={1}
            initialNumber={parseInt(stateNumber[0])}
          />
          <KeylockNumberSet
            position={2}
            initialNumber={parseInt(stateNumber[1])}
          />
          <KeylockNumberSet
            position={3}
            initialNumber={parseInt(stateNumber[2])}
          />
          <KeylockNumberSet
            position={4}
            initialNumber={parseInt(stateNumber[3])}
          />
          <KeylockNumberSet
            position={5}
            initialNumber={parseInt(stateNumber[4])}
          />
          <KeylockNumberSet
            position={6}
            initialNumber={parseInt(stateNumber[5])}
          />
        </div>
      </div>
    </>
  );
};

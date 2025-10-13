import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from './ui/Button';
import { playHelloSound } from '../utils/sounds';
import Tooltip from './ui/Tooltip';
import { useAppSelector } from '../hooks/useReduxStore';

interface Position {
  x: number;
  y: number;
}

/**
 * Utility function to get the initial visibility state from localStorage.
 * It ensures the key 'isShowImage' is correctly initialized if not present.
 */
const getInitialVisibility = (): boolean => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem('isShowImage');

    // Rule: If not found or explicitly '1', default to visible and set localStorage.
    if (storedValue === null || storedValue === '1') {
      localStorage.setItem('isShowImage', '1');
      return true;
    }

    // Otherwise, check if it's '1'
    return storedValue === '1';
  }
  // Default to visible on server-side rendering or initial load
  return true;
};

export const WavingBear = () => {
  // State for visibility, initialized from localStorage
  const [isVisible, setIsVisible] = useState<boolean>(getInitialVisibility);

  // State for the component's position (default top-left corner)
  const [position, setPosition] = useState<Position>({ x: 260, y: 140 });

  // Refs for drag state management and component element access
  const isDragging = useRef<boolean>(false);
  // Type for drag offset, same as Position
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  // Ref for the main div element
  const elementRef = useRef<HTMLDivElement>(null);

  /**
   * Syncs the current visibility state to localStorage.
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isShowImage', isVisible ? '1' : '0');
    }
  }, [isVisible]);

  /**
   * Hides the component and triggers the localStorage update via useEffect.
   */
  const handleClose = (): void => {
    setIsVisible(false);
  };

  /**
   * Start drag handler (Mouse and Touch).
   * Takes a union type of React MouseEvent and TouchEvent.
   */
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ): void => {
    e.preventDefault(); // Prevent default drag behavior (like image dragging)
    isDragging.current = true;

    // Determine the client coordinates based on event type
    const isTouchEvent = 'touches' in e;
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();

      // Calculate the offset from the top-left corner to the cursor/touch point
      dragOffset.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };

      // Update cursor style for mouse events
      if (!isTouchEvent) {
        elementRef.current.style.cursor = 'grabbing';
      }
    }
  };

  /**
   * Move drag handler (Mouse and Touch).
   * Uses native MouseEvent and TouchEvent since it's attached to the document.
   */
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !elementRef.current) return;

    // Determine the client coordinates based on event type
    const isTouchEvent = 'touches' in e;
    const clientX = isTouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : (e as MouseEvent).clientY;

    // Calculate new position using client coordinates minus the stored offset
    let newX = clientX - dragOffset.current.x;
    let newY = clientY - dragOffset.current.y;

    // Boundary checking to keep the element within the viewport
    const maxX = window.innerWidth - elementRef.current.offsetWidth;
    const maxY = window.innerHeight - elementRef.current.offsetHeight;

    newX = Math.min(Math.max(0, newX), maxX);
    newY = Math.min(Math.max(0, newY), maxY);

    setPosition({ x: newX, y: newY });
  }, []);

  /**
   * End drag handler (Mouse and Touch).
   */
  const handleDragEnd = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      if (elementRef.current) {
        elementRef.current.style.cursor = 'grab';
      }
    }
  }, []);

  /**
   * Global event listeners for drag movement/end.
   * Attached to the document body to handle fast movements outside the element's bounds.
   */
  useEffect(() => {
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  if (!isVisible) {
    return null;
  }

  // Styles for the draggable container
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex: 1000,
    transition: isDragging.current ? 'none' : 'transform 0.1s ease-out', // No transition while dragging
  };

  const handleStartTalk = async () => {
    try {
        const pressMic = window.postMessage(
            { __kb: true, type: 'ASSISTANT_CMD', command: 'startMic' },
            window.origin,
      );
      console.log({ pressMic });
    } catch (errors) {
        console.log({ errors });
    }finally{
        playHelloSound();
    }
  };


  return (
    <div
      ref={elementRef}
      style={containerStyle}
      // Apply drag start listeners
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      // Apply Tailwind classes for styling
      className='hidden cursor-grab select-none rounded-xl p-1 transition-shadow duration-300 active:cursor-grabbing lg:block'>
      <div className='relative'>
        {/* Close Button */}

        <Tooltip text="Hide if you don't want to see it.">
          <Button
            onClick={handleClose}
            variant='solid'
            color='red'
            size='sm'
            rounded='rounded-full'
            className='!absolute -right-3 -top-3 z-20  transform rounded-full shadow-lg transition duration-150 hover:scale-110 '
            icon='HeroXMark'></Button>
        </Tooltip>

        {/* Waving Bear GIF */}
        <img
          src='/images/croped-bear.gif'
          alt='Waving Bear Animated GIF'
          className=' w-fit rounded-lg lg:h-[250px] xl:h-[275px] 2xl:h-[300px]' // pointer-events-none prevents image dragging interference
        />
        <Button
            size='sm'
          onClick={handleStartTalk}
          className='!absolute right-4 max-xl:right-2 w-fit text-nowrap'
          rounded='rounded-full'
          variant='solid'
          rightIcon='HeroMicrophone'>
          Talk to me
        </Button>
      </div>
    </div>
  );
};

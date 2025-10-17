import React, { FC, ReactNode } from 'react';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import classNames from 'classnames';
import { cn } from '../../utils/cn';

interface ICollapseProps extends MotionProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
}
const Collapse: FC<ICollapseProps> = (props) => {
  const { children, isOpen, className, ...rest } = props;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className='overflow-hidden'>
        <div style={{ padding: '20px 0' }}>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};
Collapse.defaultProps = {
  isOpen: false,
  className: undefined,
};

export default Collapse;

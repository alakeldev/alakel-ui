import React from "react";

type MotionProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animate?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  transition?: unknown;
  "data-testid"?: string;
  [key: string]: unknown;
};

const createMotionComponent = (Tag: keyof React.JSX.IntrinsicElements) =>
  React.forwardRef<HTMLElement, MotionProps>(
    ({ children, animate: _a, whileHover: _wh, whileTap: _wt, transition: _t, ...props }, ref) => (
      React.createElement(Tag, { "data-testid": `motion-${Tag}`, ref, ...props }, children)
    )
  );

export const motion = {
  span: createMotionComponent("span"),
  div: createMotionComponent("div"),
  button: createMotionComponent("button"),
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

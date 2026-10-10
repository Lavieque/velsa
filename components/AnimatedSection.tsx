"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/**
 * Motion components are created once at module scope. Calling `motion.create()`
 * during render would produce a new component type on every render and remount
 * the whole subtree.
 */
const motionTags = {
  section: motion.section,
  div: motion.div,
  article: motion.article,
  form: motion.form,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  ul: motion.ul,
  li: motion.li,
} as const;

type MotionTag = keyof typeof motionTags;

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  id?: string;
  variants?: Variants;
  stagger?: number;
};

export function AnimatedSection({
  children,
  className,
  as = "section",
  id,
  variants,
  stagger,
}: AnimatedSectionProps) {
  const Tag = motionTags[as];

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants ?? staggerContainer(stagger)}
    >
      {children}
    </Tag>
  );
}

type AnimatedItemProps<T extends MotionTag> = {
  as?: T;
  variants?: Variants;
} & HTMLMotionProps<T>;

export function AnimatedItem<T extends MotionTag = "div">({
  children,
  as,
  variants,
  ...rest
}: AnimatedItemProps<T>) {
  // The public prop types above are checked against `as`; the lookup itself is
  // widened because TypeScript cannot narrow a union of motion components.
  const Tag = motionTags[(as ?? "div") as MotionTag] as ElementType;

  return (
    <Tag variants={variants ?? fadeInUp} {...rest}>
      {children}
    </Tag>
  );
}

import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const TimelineDot: React.FC<{
  index: number;
  isActive: boolean;
  onClick: () => void;
  circleRef: React.RefObject<HTMLDivElement | null>;
  title: string;
}> = ({ index, isActive, onClick, circleRef, title }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // 1. Анимация состояния
  useEffect(() => {
    if (!dotRef.current || !numberRef.current || !textRef.current) return;

    if (isActive) {
      gsap.to(dotRef.current, {
        scale: 1,
        backgroundColor: "#fff",
        border: "1px solid rgba(48, 62, 88, 0.5)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(numberRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(textRef.current, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(dotRef.current, {
        scale: 0.1,
        backgroundColor: "#42567A",
        duration: 0.4,
        ease: "power2.in",
      });
      gsap.to(numberRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(textRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isActive]);

  // 2. Компенсация вращения
  useEffect(() => {
    if (!boxRef.current || !circleRef.current) return;

    const updateRotation = () => {
      const currentRotation = gsap.getProperty(circleRef.current, "rotation") as number;
      gsap.set(boxRef.current, { rotation: -currentRotation });
    };

    updateRotation();
    gsap.ticker.add(updateRotation);

    return () => {
      gsap.ticker.remove(updateRotation);
    };
  }, [circleRef]);

  // 3. Анимация при наведении (только для неактивных точек)
  const handleEnter = () => {
    if (isActive || !dotRef.current || !numberRef.current || !boxRef.current) return;

    const currentRotation = gsap.getProperty(circleRef.current, "rotation") as number;
    gsap.set(boxRef.current, { rotation: -currentRotation });

    gsap.to(dotRef.current, {
      scale: 1.2,
      border: "1px solid rgba(66, 86, 122, 0.4)",
      backgroundColor: "#fff",
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(numberRef.current, { opacity: 1, duration: 0.2 });
  };

  // 4. Анимация при уходе мыши
  const handleLeave = () => {
    if (isActive || !dotRef.current || !numberRef.current) return;

    gsap.to(dotRef.current, {
      scale: 0.1,
      backgroundColor: "#42567A",
      duration: 0.2,
    });
    gsap.to(numberRef.current, { opacity: 0, duration: 0.15 });
  };

  return (
    <DotBox ref={boxRef} $index={index}>
      <StyledDot
        ref={dotRef}
        $isActive={isActive}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <DotNumber ref={numberRef}>{index}</DotNumber>
      </StyledDot>
      <DotText ref={textRef}>{title}</DotText>
    </DotBox>
  );
};

const DotBox = styled.div<{ $index: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  pointer-events: none;

  ${({ $index }) => {
    const startAngle = -60;
    const angleStep = 60;
    const angle = ((startAngle + $index * angleStep) * Math.PI) / 180;
    const radius = 267;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return `transform: translate(${x}px, ${y}px);`;
  }}
`;

const StyledDot = styled.div<{ $isActive: boolean }>`
  pointer-events: auto;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #42567a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const DotText = styled.div`
  position: absolute;
  left: calc(50% + 28px + 16px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  font-weight: 700;
  color: #42567a;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
`;

const DotNumber = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #42567A;
  line-height: 30%;
  opacity: 0;
`;

export default TimelineDot;
import React, { useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import TimelineDot from "../TimelineDot/index";
import { timelineData } from "../../../model/EventsData";
import EventsList from "../EventsList/index";

const HistoricalDates: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(6);
  const currentItem = timelineData[activeIndex - 1] ?? timelineData[0];
  const circleRef = useRef<HTMLDivElement | null>(null);
  // Рефы для хранения текущих отображаемых значений
  const currentStartYear = useRef<number>(2015);
  const currentEndYear = useRef<number>(2022);

  // Рефы для DOM-элементов
  const yearStartRef = useRef<HTMLDivElement | null>(null);
  const yearEndRef = useRef<HTMLDivElement | null>(null);

  const handleDotClick = (newIndex: number) => {
    if (circleRef.current == null) return;
    if (newIndex === activeIndex) return;

    const totalDots = 6;
    const angleStep = 60;
    const currentIndex = activeIndex;

    let diff = newIndex - currentIndex;
    if (diff <= 0) {
      diff += totalDots;
    }

    const rotationAmount = diff * angleStep;

    // Получаем новые значения годов
    const newStartYear = timelineData[newIndex - 1].period.start;
    const newEndYear = timelineData[newIndex - 1].period.end;

    // Анимация вращения круга + счётчик годов
    const tl = gsap.timeline();

    tl.to(circleRef.current, {
      rotation: `-=${rotationAmount}`,
      duration: 0.8,
      ease: "power2.inOut",
      transformOrigin: "center center",
      onUpdate: () => {
        // Анимация счётчика для начального года
        if (yearStartRef.current) {
          const progress = tl.progress();
          const interpolatedStart = Math.round(
            currentStartYear.current +
              (newStartYear - currentStartYear.current) * progress,
          );
          yearStartRef.current.textContent = interpolatedStart.toString();
        }

        // Анимация счётчика для конечного года
        if (yearEndRef.current) {
          const progress = tl.progress();
          const interpolatedEnd = Math.round(
            currentEndYear.current +
              (newEndYear - currentEndYear.current) * progress,
          );
          yearEndRef.current.textContent = interpolatedEnd.toString();
        }
      },
      onComplete: () => {
        currentStartYear.current = newStartYear;
        currentEndYear.current = newEndYear;
        setActiveIndex(newIndex);
      },
    });
  };

  return (
    <>
      {/* <GridOverlay>
        {[...Array(24)].map((_, i) => (
          <GridColumn key={i} />
        ))}
      </GridOverlay> */}
      <ContentWrapper>
        <Header>
          <GradientBox />
          <Title>Исторические даты</Title>
        </Header>
        <YearsSection>
          <Year2015 ref={yearStartRef}>{currentItem.period.start}</Year2015>

          <TimelineEllipse ref={circleRef}>
            {timelineData.map((item, i) => (
              <TimelineDot
                key={i}
                index={i + 1}
                isActive={activeIndex === i + 1}
                onClick={() => handleDotClick(i + 1)}
                circleRef={circleRef}
                title={item.title}
              />
            ))}
          </TimelineEllipse>

          <Year2022 ref={yearEndRef}>{currentItem.period.end}</Year2022>
        </YearsSection>

        <EventsList
          currentIndex={activeIndex}
          totalItems={timelineData.length}
          onNavigate={handleDotClick}
          events={currentItem.events}
        />
      </ContentWrapper>
    </>
  );
};

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  pointer-events: none;
  z-index: 0;
`;

const GridColumn = styled.div`
  border-right: 1px solid rgba(255, 0, 0, 0.2);
  height: 100%;

  &:last-child {
    border-right: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin: 0 160px 0 320px;
  padding: 170px 0 104px 0;
  border-right: 1px solid rgba(66, 86, 122, 0.1);
  border-left: 1px solid rgba(66, 86, 122, 0.1);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background-color: rgba(66, 86, 122, 0.1);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 480px;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: rgba(66, 86, 122, 0.1);
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 78px;
  max-width: 431px;
  margin-bottom: 96px;
`;
const GradientBox = styled.div`
  background-image: linear-gradient(180deg, #3877ee, #ef5da8);
  width: 5px;
`;
const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #42567a;
  line-height: 120%;
`;

const YearsSection = styled.div`
  pointer-events: none;
  gap: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 250px 0 217px;
  margin-bottom: 137px;
`;

const Year2015 = styled.div`
  pointer-events: none;
  font-size: 200px;
  font-weight: 700;
  color: #5d5fef;
  line-height: 160px;
  letter-spacing: -0.02em;
`;

const Year2022 = styled.div`
  font-size: 200px;
  font-weight: 700;
  color: #ef5da8;
  line-height: 160px;
  letter-spacing: -0.02em;
`;

const TimelineEllipse = styled.div`
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  width: 536px;
  height: 530px;
  border: 1px solid rgba(66, 86, 122, 0.2);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
`;

export default HistoricalDates;

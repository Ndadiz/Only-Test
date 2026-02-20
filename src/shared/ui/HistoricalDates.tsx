import React from "react";
import styled from "styled-components";

const HistoricalDates: React.FC = () => {
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
            <Title>
              Исторические
              даты
            </Title>
          </Header>
          <YearsSection>
            <Year2015>2015</Year2015>

            <TimelineEllipse />
            {[...Array(6)].map((_, i) => (
              <TimelineDot key={i + 1} index={i + 1} />
            ))}

            <Year2022>2022</Year2022>
          </YearsSection>
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
  height: 1080px;
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
  gap: 85px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 250px 0 217px;
`;

const Year2015 = styled.div`
  font-size: 200px;
  font-weight: 700;
  color: #5d5fef;
  line-height: 160%;
  letter-spacing: -0.02em;
`;

const Year2022 = styled.div`
  font-size: 200px;
  font-weight: 700;
  color: #ef5da8;
  line-height: 160%;
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

interface TimelineDotProps {
  index: number;
}

const TimelineDot = styled.div<TimelineDotProps>`
  width: 6px;
  height: 6px;
  background-color: #42567a;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 55%;

  ${({ index }) => {
    const startAngle = 0;
    const angleStep = 60;
    const angle = ((startAngle + index * angleStep) * Math.PI) / 180;
    const radius = 267; // Половина высоты круга
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return `
      transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
    `;
  }}
`;

export default HistoricalDates;

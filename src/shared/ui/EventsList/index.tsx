// components/EventsList/index.tsx
import React from "react";
import styled from "styled-components";

interface EventsListProps {
  currentIndex: number;
  totalItems: number;
  onNavigate: (index: number) => void;
  events: Array<{
    year: number;
    description: string;
  }>;
}

const EventsList: React.FC<EventsListProps> = ({
  currentIndex,
  totalItems,
  onNavigate,
  events,
}) => {
  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    const nextIndex =  currentIndex + 1;
    onNavigate(nextIndex);
  };

    // Проверяем, должны ли кнопки быть отключены
  const isPrevDisabled = currentIndex === 1;
  const isNextDisabled = currentIndex === totalItems;

  return (
    <Container>
      <Navigation>
        <Counter>
          {String(currentIndex).padStart(2, "0")}/{String(totalItems).padStart(2, "0")}
        </Counter>
        <Buttons>
          <NavButton 
          disabled={isPrevDisabled}
          onClick={handlePrev}>
            <Arrow>‹</Arrow>
          </NavButton>
          <NavButton 
          disabled={isNextDisabled}
          onClick={handleNext}>
            <Arrow>›</Arrow>
          </NavButton>
        </Buttons>
      </Navigation>
      <Events>
        {events.map((event, idx) => (
          <EventItem key={idx}>
            <EventYear>{event.year}</EventYear>
            <EventDesc>{event.description}</EventDesc>
          </EventItem>
        ))}
      </Events>
    </Container>
  );
};

const Container = styled.div`
    margin-left: 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const Navigation = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const Counter = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #42567A;
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.5);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  `}

  &:hover {
    border-color: rgba(66, 86, 122, 0.4);
    background: rgba(66, 86, 122, 0.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Arrow = styled.span`
  font-size: 24px;
  color: #42567a;
`;

const Events = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const EventItem = styled.div`
  display: flex;
  gap: 24px;
  align-items: baseline;
`;

const EventYear = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #5d5fef;
  min-width: 60px;
`;

const EventDesc = styled.span`
  font-size: 18px;
  color: #42567a;
  line-height: 140%;
`;

export default EventsList;
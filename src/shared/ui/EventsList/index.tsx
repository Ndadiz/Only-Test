import React from "react";
import styled from "styled-components";
import ArrowLeft from "@public/ArrowLeft.svg";
import ArrowRight from "@public/ArrowRight.svg";
import SliderArrowLeft from "@public/SliderArrowLeft.svg";
import SliderArrowRight from "@public/SliderArrowRight.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { media } from "@app/styles/media";

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
  // Проверяем, должны ли кнопки быть отключены
  const isPrevDisabled = currentIndex === 1;
  const isNextDisabled = currentIndex === totalItems;

  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    onNavigate(nextIndex);
  };

  return (
    <Container>
      <NavigationWrapper>
        <LeftSection>
          <Counter>
            {String(currentIndex).padStart(2, "0")}/
            {String(totalItems).padStart(2, "0")}
          </Counter>
          <Buttons>
            <NavButton disabled={isPrevDisabled} onClick={handlePrev}>
              <StyledArrowLeft />
            </NavButton>
            <NavButton disabled={isNextDisabled} onClick={handleNext}>
              <StyledArrowRight />
            </NavButton>
          </Buttons>
        </LeftSection>

        
        <PaginationDots>
          {Array.from({ length: totalItems }).map((_, idx) => (
            <Dot
              key={idx}
              $isActive={currentIndex === idx + 1}
              onClick={() => onNavigate(idx + 1)}
            />
          ))}
        </PaginationDots>
      </NavigationWrapper>

      <SwiperWrapper>
        <CustomNavButton className="swiper-button-prev">
          <SliderArrowLeft />
        </CustomNavButton>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          spaceBetween={80}
          slidesPerView="auto"
          className="events-swiper"
        >
          {events.map((event, idx) => (
            <SwiperSlide key={idx} className="event-slide">
              <EventCard>
                <EventYear>{event.year}</EventYear>
                <EventDesc>{event.description}</EventDesc>
              </EventCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomNavButton className="swiper-button-next">
          <SliderArrowRight />
        </CustomNavButton>
      </SwiperWrapper>
    </Container>
  );
};

const SwiperWrapper = styled.div`
  width: 1320px;
  position: relative;
  display: flex;
  align-items: center;
  ${media.mobile} {
    width: 100%;
  }
  
`;

const CustomNavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  &.swiper-button-prev {
    left: 0;
  }

  &.swiper-button-next {
    right: 0;
  }

  &.swiper-button-disabled {
    display: none;
  }
  ${media.mobile} {
    display: none;
  }
`;

const Container = styled.div`
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
  ${media.mobile} {
    flex-direction: column-reverse;
    margin: 0;
    gap: 78px;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 38.67px;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  ${media.mobile} {
    gap: 11px;
  }
`;

const Counter = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #42567a;
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
    ${media.mobile} {
      gap: 8px;
    }
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

  ${media.mobile} {
    width: 25px;
    height: 25px;
  }
`;

const StyledArrowLeft = styled(ArrowLeft)`
  width: 9px;
  height: 14px;
  stroke: #42567a;
  flex-shrink: 0;
  ${media.mobile} {
    width: 3.12px;
    height: 6.25px;
  }
`;

const StyledArrowRight = styled(ArrowRight)`
  width: 9px;
  height: 14px;
  stroke: #42567a;
  flex-shrink: 0;
  ${media.mobile} {
    width: 3.12px;
    height: 6.25px;
  }
`;

const EventCard = styled.div`
  max-width: 320px;
  height: 135px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  cursor: grab;
  ${media.mobile} {
     max-width: 280px;
  }
`;

const EventYear = styled.div`
  font-family: "Bebas Neue", sans-serif;
  font-size: 25px;
  color: #3877ee;
  line-height: 120%;
  ${media.mobile} {
    font-size: 16px;
  }
`;

const EventDesc = styled.div`
  font-size: 20px;
  color: #42567a;
  line-height: 30px;
  flex: 1;
  ${media.mobile} {
    font-size: 14px;
    line-height: 145%;
  }
`;

const PaginationDots = styled.div`
  display: none;
  gap: 10px;
  align-items: center;
  ${media.mobile} {
    display: flex;
  }
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${({ $isActive }) => ($isActive ? "#42567A" : "rgba(66, 86, 122, 0.4)")};
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #3B5998;
  }
`;

export default EventsList;

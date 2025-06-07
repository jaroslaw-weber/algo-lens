import React, { useRef, useEffect, useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

function Arrow(p: { direction: string; onClick: () => void }) {
  const { direction, onClick } = p;
  return (
    <button
      className="w-8 h-8 rounded-full bg-primary text-primary-content"
      onClick={() => {
        onClick();
      }}
    >
      <i className={`fas ${direction}`}></i>
    </button>
  );
}

const Slider: React.FC<SliderProps> = ({ min, max, value, onChange }) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsPlaying(false);
    }
    onChange(parseInt(event.target.value, 10));
  };

  const handleArrowClick = (step: number) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsPlaying(false);
    }
    if (sliderRef.current) {
      if (step === -1) {
        sliderRef.current.stepDown();
      } else {
        sliderRef.current.stepUp();
      }
      onSliderValueChanged();
    }
  };

  const handleArrowKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (sliderRef.current) {
      const { key } = event;

      if (key === "ArrowLeft") {
        handleArrowClick(-1);
      } else if (key === "ArrowRight") {
        handleArrowClick(1);
      }
    }
  };

  function onSliderValueChanged() {
    const value = sliderRef.current?.value;
    const parsed = parseInt(value ?? "", 10);
    onChange(parsed);
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        if (sliderRef.current) {
          sliderRef.current.stepUp();
          onSliderValueChanged();
        }
      }, 1000);
      setIntervalId(id);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.value = value.toString();
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="flex flex-column items-center justify-center gap-4 w-full mb-8">
      <div
        className="tooltip  tooltip-top"
        data-tip="Use slider to see how the code works. Press ← or → to adjust the value using keyboard arrows."
      >
        <i className="fas fa-circle-info hover:scale-110 transition-transform duration-300"></i>
      </div>
      <p>{value}</p>

      <div className="flex items-center gap-2">
        <Arrow direction="fa-arrow-left" onClick={() => handleArrowClick(-1)} />
        <button
          className="w-8 h-8 rounded-full bg-primary text-primary-content"
          onClick={togglePlayPause}
        >
          <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
        </button>
        <Arrow direction="fa-arrow-right" onClick={() => handleArrowClick(1)} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        //onInput={handleSliderChange} // Use onInput instead of onChange
        className="range range-primary  w-full"
        ref={sliderRef}
        onKeyDown={handleArrowKeyPress}
      />
    </div>
  );
};

export default Slider;

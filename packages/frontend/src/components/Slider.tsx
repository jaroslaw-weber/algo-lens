import React, { useRef, useEffect } from "react";

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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value, 10));
  };
  const handleArrowKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (sliderRef.current) {
      const { key } = event;

      if (key === "ArrowLeft") {
        sliderRef.current.stepDown();
        onSliderValueChanged();
      } else if (key === "ArrowRight") {
        sliderRef.current.stepUp();
        onSliderValueChanged();
      }
    }
  };

  function onSliderValueChanged() {
    const value = sliderRef.current?.value;
    const parsed = parseInt(value ?? "", 10);
    onChange(parsed);
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.value = value.toString();
    }
  }, [value]);

  return (
    <div className="flex flex-column items-center justify-center gap-4 w-full">
      <div
        className="tooltip  tooltip-top"
        data-tip="Use slider to see how the code works. Press ← or → to adjust the value using keyboard arrows."
      >
        <i className="fas fa-circle-info hover:scale-110 transition-transform duration-300"></i>
      </div>
      <p>{value}</p>
     
     <div>
      <Arrow direction="fa-arrow-left" onClick={() => {
        if (sliderRef.current) {
          sliderRef.current.stepDown();
          onSliderValueChanged();
        }
      }} />
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
        //onKeyDown={handleArrowKeyPress}
      />
      <div>
        <Arrow
          direction="fa-arrow-right"
          onClick={() => {
            if (sliderRef.current) {
              sliderRef.current.stepUp();
              onSliderValueChanged();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Slider;

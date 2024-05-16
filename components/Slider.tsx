import React, { useRef, useEffect } from "react";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
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
    const parsed = parseInt(value?? "", 10);
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
      <button
        className="px-2 py-1 rounded-full  bg-primary text-primary-content"
        onClick={() => {
          if (sliderRef.current) {
            sliderRef.current.stepDown();
            onSliderValueChanged();
          }
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
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
      <button
        className="px-2 py-1 rounded-full bg-primary text-primary-content"
        onClick={() => {
          if (sliderRef.current) {
            sliderRef.current.stepUp();
            onSliderValueChanged();
          }
        }}
      >
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Slider;
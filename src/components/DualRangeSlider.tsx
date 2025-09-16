import { useCallback, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label"; // Assuming a ShadCN-like Label component

const DualRangeSlider = ({
  min = 0,
  max,
  value,
  onChange,
  label,
}: {
  min?: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
}) => {
  const [minVal, maxVal] = value;
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert a value to a percentage
  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  // Set the position and width of the colored range bar
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  return (
    <div className="space-y-6">
      <Label className="text-lg font-semibold">{label}</Label>

      {/* Slider container */}
      <div className="relative h-2">
        {/* Min value slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            onChange([value, maxVal]);
          }}
          // The max-value thumb is always on top
          className="absolute w-full h-full bg-transparent appearance-none pointer-events-none z-30 thumb-z-30"
        />
        
        {/* Max value slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            onChange([minVal, value]);
          }}
          className="absolute w-full h-full bg-transparent appearance-none pointer-events-none z-40"
        />

        {/* Track and Range visuals */}
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full bg-gray-200 rounded-md z-10" />
          <div ref={rangeRef} className="absolute h-full bg-primary rounded-md z-20" />
        </div>
      </div>

      {/* Value display */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">${min}K</span>
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">
            ${minVal}K - ${maxVal}K
          </p>
          <p className="text-xs text-muted-foreground">Selected Range</p>
        </div>
        <span className="text-sm text-muted-foreground">${max}K</span>
      </div>

      {/*
        The key to centering the thumb is making the thumb's height a multiple 
        of the track's height and using a negative margin-top of half the
        thumb's height minus half the track's height.
        
        Track height (h-2) = 8px
        Thumb height = 20px
        Calculation: (8px - 20px) / 2 = -6px
      */}
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid hsl(var(--primary));
          cursor: pointer;
          pointer-events: auto;
          margin-top: -6px; /* Correct value for centering */
          position: relative;
          z-index: 50; /* Ensure thumb is above track */
        }

        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid hsl(var(--primary));
          cursor: pointer;
          pointer-events: auto;
          position: relative;
          z-index: 50; /* Ensure thumb is above track */
        }
        
        /* This class is used to bring the min thumb to the front when they overlap */
        .thumb-z-30:hover::-webkit-slider-thumb {
            z-index: 55;
        }
        .thumb-z-30:hover::-moz-range-thumb {
            z-index: 55;
        }

      `}</style>
    </div>
  );
};

export default DualRangeSlider;

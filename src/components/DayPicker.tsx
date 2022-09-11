interface DayPickerProps {
  setDayChoice: React.Dispatch<React.SetStateAction<number[]>>;
  dayChoice: number[];
  setDurations: React.Dispatch<React.SetStateAction<number>>;
  durations: number;
}

function DayPicker({
  setDayChoice,
  dayChoice,
  setDurations,
  durations,
}: DayPickerProps) {
  const handleSetDay = (day: number) => {
    if (!dayChoice.includes(day)) {
      setDayChoice((current) => [...current, day]);
    } else {
      setDayChoice((current) => current.filter((item) => item !== day));
    }
  };

  return (
    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 ">
      <div className="flex items-center gap-2">
        <span className="mr-1">Shedule:</span>
        <button
          onClick={() => handleSetDay(0)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(0) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          S
        </button>
        <button
          onClick={() => handleSetDay(1)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(1) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          M
        </button>
        <button
          onClick={() => handleSetDay(2)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(2) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          T
        </button>
        <button
          onClick={() => handleSetDay(3)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(3) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          W
        </button>
        <button
          onClick={() => handleSetDay(4)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(4) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          T
        </button>
        <button
          onClick={() => handleSetDay(5)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(5) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          F
        </button>
        <button
          onClick={() => handleSetDay(6)}
          className={`border-2 dark:bg-slate-700 ${
            !dayChoice.includes(6) ? "border-gray-300" : "border-orange-500"
          } bg-slate-50 rounded-full w-7 h-7 focus:outline-none`}
        >
          S
        </button>
      </div>

      <div className="flex ml-6 items-center">
        <span className="mr-1">Durations: </span>
        <div className="relative">
          <select
            onChange={(e) => setDurations(parseInt(e.target.value))}
            defaultValue={durations}
            className="rounded border-2 appearance-none border-gray-400 dark:bg-slate-700 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
          >
            <option value={1}>1 Week</option>
            <option value={2}>2 Week</option>
            <option value={3}>3 Week</option>
            <option value={4}>4 Week</option>
            <option value={5}>5 Week</option>
          </select>
          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DayPicker;

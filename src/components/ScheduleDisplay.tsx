function ScheduleDisplay({ schedule }: { schedule: Array<number> }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        className={`border-2 ${
          !schedule.includes(0) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        S
      </button>
      <button
        className={`border-2 ${
          !schedule.includes(1) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        M
      </button>
      <button
        className={`border-2 ${
          !schedule.includes(2) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        T
      </button>
      <button
        className={`border-2 ${
          !schedule.includes(3) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        W
      </button>
      <button
        className={`border-2 ${
          !schedule.includes(4) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        T
      </button>
      <button
        className={`border-2 ${
          !schedule.includes(5) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        F
      </button>
      <button
        className={`border-2 ${
          !schedule.includes(6) ? "border-gray-300" : "border-orange-500"
        } bg-slate-50 dark:bg-slate-700 rounded-full w-7 h-7 focus:outline-none`}
      >
        S
      </button>
    </div>
  );
}

export default ScheduleDisplay;

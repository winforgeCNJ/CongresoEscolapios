//Ya pasó la fecha máxima de inscripción?

const hasDatePassed = (): boolean => {
  const targetDate = new Date("2024-08-15");
  const currentDate = new Date();
  const bool = currentDate > targetDate;
  debugger;
  return bool;
};

export default hasDatePassed;

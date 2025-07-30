const getPastDatesSameDay = (yearsBack = 5) => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dates = [];

  for (let i = 0; i <= yearsBack; i++) {
    const year = today.getFullYear() - i;
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
};
console.log(getPastDatesSameDay(6));
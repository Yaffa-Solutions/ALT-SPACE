// const getRandomSpaceFact = () => {
//   const getRandomDate = () => {
//     const start = new Date(1995, 5, 16);
//     const end = new Date();
//     const randomTime =
//       start.getTime() + Math.random() * (end.getTime() - start.getTime());
//     return new Date(randomTime).toISOString().split('T')[0];
//   };

//   const date = getRandomDate();
//   const apiKey = 'DEMO_KEY';
//   const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const data = JSON.parse(xhr.responseText);
//       console.log(data);
//       renderRandomFactSection(data);
//     } else {
//       alert('Failed to fetch space fact.');
//     }
//   };

//   xhr.send();
// };
// const data = getRandomSpaceFact();
// console.log(data);

const getPastDatesSameDay = (yearsBack = 5) => {
  const today = new Date();
  console.log(today);
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

const fetchFactsForSameDay = () => {
  const apiKey = 'BBMsCZoVKg5JjsYQZx9s8hYD7a6lqb9unHqF54Ob';
  const dates = getPastDatesSameDay(5);

  dates.forEach((date, index) => {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

      xhr.open('GET', url, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log('Data fetched:', data);
          renderFactCard(data);
        } else {
          console.error(`Failed to fetch for ${date} (Status: ${xhr.status})`);
        }
      };

      xhr.send();
    }, index * 1500);
  });
};

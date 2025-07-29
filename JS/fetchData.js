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

const fetchFactsForSameDay = () => {
  const apiKey = 'BBMsCZoVKg5JjsYQZx9s8hYD7a6lqb9unHqF54Ob';
  const dates = getPastDatesSameDay(5);

  dates.forEach((date, index) => {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
      const results = [];

      xhr.open('GET', url, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          results.push(data);
          if (results.length === dates.length) {
            callback(results);
            console.log(`${results} fetched successfully.`);

          } else {
            console.error(
              `Failed to fetch for ${date} (Status: ${xhr.status})`
            );
          }
        }
      };

      xhr.send();
    }, index * 1000);
  });
};

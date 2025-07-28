const getRandomSpaceFact = () => {
  const getRandomDate = () => {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  };

  const date = getRandomDate();
  const apiKey = 'DEMO_KEY';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      renderRandomFactSection(data);
    } else {
      alert('Failed to fetch space fact.');
    }
  };

  xhr.send();
};
const data = getRandomSpaceFact();
console.log(data);

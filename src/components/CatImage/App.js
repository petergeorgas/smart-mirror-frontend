import { useEffect } from 'react';

const height = "100px"

function App() {
  useEffect(() => {
    let cat_result = document.getElementById("cat_result");
    fetch('https://aws.random.cat/meow')
    .then(res => res.json())
    .then(data => {
    cat_result.innerHTML = `<img style="height: ${height}; width: ${height};" src="${data.file}"/>`
        })

  }, []);

  return (
    <div id="cat_result"></div>
  );
}

export default App;

import ReactDOM from 'react-dom/client'

const root = document.getElementById('root')

// Probably gonna want to put some measure of documentation for what api endpoints are available here, like Swapi does
if (root) {
  ReactDOM.createRoot(root).render(
    <div>
      <h1>YEAST INFECTION?!</h1>
      <p>Do I need to shave?</p>
      <button
        id="shaveButton"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          fetch('/doINeedToShave')
            .then((res) => res.text())
            .then((text) => {
              console.log(text)
            })
        }}
      >
        Check
      </button>
    </div>
  )
}

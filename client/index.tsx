import ReactDOM from 'react-dom/client'
import { App } from './app'

const root = document.getElementById('root')

// Probably gonna want to put some measure of documentation for what api endpoints are available here, like Swapi does
if (root) {
  ReactDOM.createRoot(root).render(
    <div>
      <App />
    </div>
  )
}

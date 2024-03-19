import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import QuizTest from './components/Mathtest.jsx'
import Footer from './components/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
  <body className=''>
    <QuizTest/>
    <Footer/>
  </body> 
  </React.StrictMode>,
)

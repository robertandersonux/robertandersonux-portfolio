import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        {/* Still to come: About */}
        <Contact />
      </main>
      {/* The footer sits outside <main>: it's site-wide utility, not this page's main content */}
      <Footer />
    </>
  )
}

export default App

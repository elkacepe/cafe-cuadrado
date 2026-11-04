import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Menu from './components/Menu.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

// La página completa: cada bloque es un componente en /src/components.
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

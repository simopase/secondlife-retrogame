import Navbar from "./components/Navbar";
import { ShoppingCart, User } from 'lucide-react';
import SwiperComponent from "./components/Swiper";

const slides = [
  {
    title: {
      text: "Il tuo nuovo vecchio gioco preferito",
      primaryWord: "nuovo",
      secondaryWord: "preferito"
    },
    image: "slider/slide1.jpg",
    bottomText: "This is slide 1"
  },
  {
    title: {
      text: "Il tuo nuovo vecchio gioco preferito"
    },
    image: "slider/slide2.jpg",
    bottomText: "This is slide 2"
  },
]

export default function Home() {
  return <>
    <div className="border-b-2 border-primary-red">
      <Navbar className="container mx-auto flex justify-between items-center">
        <ul className="font-monserrat text-lg uppercase font-bold">
          <li className="inline-block mx-4">Shop</li>
          <li className="inline-block mx-4">Chi siamo</li>
          <li className="inline-block mx-4">Contatti</li>
        </ul>
        <div className="flex space-x-4">
          <ShoppingCart className="text-primary-yellow" />
          <User className="text-primary-yellow" />
        </div>
      </Navbar>
    </div>
    <SwiperComponent slides={slides} />
  </>

}

import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'

import './styles/main.css'

import logoImg from './assets/logo-nlw-eSports.svg'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className='max-w[1344] flex flex-col items-center my-20 mx-auto'>
      <img src={logoImg} alt='Logo'></img>


      <h1 className='text-6xl text-white font-black mt-20 text-[22px] sm:text-[36px] md:text-[50px]'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App

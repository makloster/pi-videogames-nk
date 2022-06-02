import { Link } from 'react-router-dom'
import s from './styles/landingPage.module.css'

export default function Landing() {
  return (
    <div className={s.contents}>
      <h1 className={s.title}>VG App!</h1>
      <Link to={`/home`}>
        <div className={s.imgContainer}>
          <img className={s.startButton} src={'https://i.imgur.com/pf9eBmD.png'} alt={'Link to home'} />
        </div>
      </Link>
    </div>
  )
}
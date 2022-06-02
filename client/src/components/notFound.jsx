import s from './styles/detail.module.css'

export default function NotFound() {
  return (
    <div className={s.card}>
      <img className={s.error404} src='https://i.imgur.com/5D5JWvB.png' alt={'not found!'} />
    </div>
  )
}
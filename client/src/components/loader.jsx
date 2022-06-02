import s from './styles/detail.module.css'

export default function Loader() {
  return (
    <div className={s.card}>
      <img className={s.loading} src='https://i.imgur.com/GAKN1lT.gif' alt={'loading'} />
    </div>
  )
}
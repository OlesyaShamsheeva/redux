import { useActions } from '../hooks/actions';

export const RepoCars = ({ repo }) => {
  const {addFavourite}=useActions()
const addToFavourite=(e)=>{
  e.preventDefault()
  addFavourite(repo.html_url)
}
  return (
    <div>
      <a href={repo.html_url} target="_blank">
      <h1> {repo.name}</h1>
      <p>Forks: <span> {repo.forsks}</span></p>
      <p><span>Watchers: {repo.watchers}</span></p>
      <button onClick={ addToFavourite}> grrr</button>
      </a>
    </div>
  )
}
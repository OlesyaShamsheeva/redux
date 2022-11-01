import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api';
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/debounce';
import { RepoCars } from '../components/RepoCars';

export const Home = () => {
  const [search, setSearch] = useState('')
  const [dropdown, setDropDown] = useState(false)
  const debounced = useDebounce(search)

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
      skip: debounced.length < 3,
      refetchOnFocus: true
    }
  )

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()
  useEffect(() => {
    setDropDown(debounced.length > 3 && data?.length > 0)
  }, [debounced, data])
  const clickHandler = (username) => {
    fetchRepos(username)
    setDropDown(false)
  }
  return (
    <div>
      {isError && <p>error</p>}
      <input
        type="text"
        placeholder="Search for Github username..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {dropdown && <ul>
        {isLoading && <p>Loading..</p>}
        {data?.map(user => (
          <li key={user.id} onClick={() => clickHandler(user.login)}>{user.login}</li>
        ))}
      </ul>}
      <div>
        {areReposLoading && <p>Repos loading..</p>}
        {repos?.map(repo => <RepoCars repo={repo} key={repo.id}/>)}
      </div>
    </div>
  )
}

//skip-условие стоп refetchOnFocus-если мы вернулись фокусом на страницу то автоматически запрос
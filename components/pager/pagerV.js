import Pagination from 'react-bootstrap/Pagination'
import { useMemo } from 'react'

function createPaginationItems (page, nbPages, handleClick) {
  page = parseInt(page) // page is the activePage, number will be the number of the button
  let items = []
  items.push(
    <Pagination.Item disabled={page === 1} id={'firstButton'} key={-1} onClick={handleClick}>
      {'First'}
    </Pagination.Item>
  )
  items.push(
    <Pagination.Item disabled={page === 1} id={'prevButton'} key={-2} onClick={handleClick}>
      {'Previous'}
    </Pagination.Item>
  )
  items.push(
    <Pagination.Item disabled={page < 4} id={'prevSetButton'} key={-3} onClick={handleClick}>
      {page < 4 ? '\\' : '...'}
    </Pagination.Item>
  )
  for (let number = 1; number <= nbPages; number++) {
    items.push(
      <Pagination.Item active={number === page} hidden={number > page + 2 || number < page - 2} id={number} key={number} onClick={handleClick}>
        {number}
      </Pagination.Item>
    )
  }
  items.push(
    <Pagination.Item disabled={page > nbPages - 3} id={'nextSetButton'} key={-4} onClick={handleClick}>
      {page > nbPages - 3 ? '/' : '...'}
    </Pagination.Item>
  )
  items.push(
    <Pagination.Item disabled={page === nbPages} id={'nextButton'} key={-5} onClick={handleClick}>
      {'Next'}
    </Pagination.Item>
  )
  items.push(
    <Pagination.Item disabled={page === nbPages} id={'lastButton'} key={-6} onClick={handleClick}>
      {'Last'}
    </Pagination.Item>
  )
  return items
}

export default ({ page, nbPages, paginationChange, handleClick }) => {
  const items = useMemo(() => createPaginationItems(page, nbPages, handleClick), [page, nbPages, paginationChange, handleClick]) // render again only if it's a different page
  if (items.length > 1) {
    return <Pagination>{items}</Pagination>
  } else {
    return null
  }
}

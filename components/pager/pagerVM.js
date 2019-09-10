import { compose, withHandlers } from 'recompose'
import View from './pagerV'

const handler = withHandlers({
  handleClick: props => event => {
    event.preventDefault()
    const { paginationChange, page, nbPages } = props
    let pageNumber = event.target.id
    let lastPage = nbPages
    let thePage = parseInt(page)
    if (isNaN(pageNumber)) {
      switch (pageNumber) {
        case 'firstButton':
          pageNumber = 1
          break
        case 'prevButton':
          if (thePage > 1) pageNumber = thePage - 1
          else pageNumber = thePage
          break
        case 'prevSetButton':
          if (thePage > 3) pageNumber = thePage - 3
          else pageNumber = thePage
          break
        case 'nextSetButton':
          if (thePage < lastPage - 2) pageNumber = thePage + 3
          else pageNumber = thePage
          break
        case 'nextButton':
          if (thePage < lastPage) pageNumber = thePage + 1
          else pageNumber = thePage
          break
        case 'lastButton':
          pageNumber = lastPage
          break
        default:
          pageNumber = 1
      }
    }
    paginationChange(pageNumber)
  }
})

export default compose(
  handler
)(View)

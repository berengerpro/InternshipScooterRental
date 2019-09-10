import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { APP_CONFIG } from '@app/constants'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTable from 'react-table'

const UsersTable = (props) => {
  const { handleShowModal, handleEdit, usersArray } = props
  return (
    <div>

      <ReactTable
        className='-striped -highlight'
        columns={[
          {
            Header: 'Credentials',
            columns: [
              {
                Header: 'Email',
                accessor: 'email'
              },
              {
                Header: 'Name',
                accessor: 'name'
              }
            ]
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Trips',
                accessor: 'trips'
              },
              {
                Header: 'Total Distance',
                accessor: 'distance'
              },
              {
                Header: 'Total Duration',
                accessor: 'duration'
              },
              {
                Header: 'Member since',
                id: 'memberSince',
                accessor: (d) => new Date(d.memberSince.seconds * 1000).toLocaleDateString()
              }
            ]
          },
          {
            Header: 'Actions',
            columns: [
              {
                Header: '',
                id: 'edit',
                accessor: 'id',
                // eslint-disable-next-line react/jsx-no-bind
                Cell: row => <Button variant='warning' onClick={() => handleEdit(row.value)}><FontAwesomeIcon icon={faPen} /></Button>
              },
              {
                Header: '',
                id: 'delete',
                accessor: 'id',
                // eslint-disable-next-line react/jsx-no-bind
                Cell: row => <Button variant='danger' onClick={() => handleShowModal(row.value)}><FontAwesomeIcon icon={faTrash} /></Button>
              }
            ]
          }
        ]}
        data={usersArray}
        defaultPageSize={APP_CONFIG.FETCH_COUNT_PER_PAGE}
        resized={[
          {
            id: 'edit',
            value: 50
          },
          {
            id: 'delete',
            value: 50
          }
        ]}
      />

    </div>
  )
}

export default (UsersTable)

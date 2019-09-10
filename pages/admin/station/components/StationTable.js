import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { APP_CONFIG } from '@app/constants'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import ReactTable from 'react-table'
import { useMemo } from 'react'
import 'react-table/react-table.css'

const UsersTable = (props) => {
  const { stations = [], handleEdit, handleShowModal } = props
  const data = useMemo(() => (Object.values(stations)), [stations])
  return (
    <div>

      <ReactTable
        className='-striped -highlight'
        columns={[
          {
            accessor: 'name',
            Header: 'Name'
          },
          {
            accessor: 'address',
            Header: 'Address'
          },
          {
            accessor: d => d.location ? d.location._lat + '° N, ' + d.location._long + '° E' : 'N/A',
            Header: 'Location',
            id: 'location'
          },
          {
            accessor: 'number',
            Header: 'N°',
            id: 'number'
          },
          {
            accessor: 'status',
            Header: 'Status'
          },
          {
            accessor: d => d.createdAt ? moment.unix(d.createdAt.seconds).format('LLL') : 'N/A',
            Header: 'Created At',
            id: 'createdAt'
          },
          {
            accessor: 'id',
            id: 'edit',
            Cell: d => (
              <div className='float-right'>
                { /* eslint-disable-next-line react/jsx-no-bind */ }
                <Button id={d.index} variant='warning' onClick={() => { handleEdit(d.value) }}>
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </div>
            )
          },
          {
            accessor: 'id',
            id: 'delete',
            Cell: d => (
              <div className='float-right'>
                { /* eslint-disable-next-line react/jsx-no-bind */ }
                <Button id={d.index} variant='danger' onClick={() => { handleShowModal(d.value) }}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            )
          }
        ]}
        data={data}
        defaultPageSize={APP_CONFIG.FETCH_COUNT_PER_PAGE}
        resized={[
          {
            'id': 'number',
            'value': 30
          },
          {
            'id': 'edit',
            'value': 50
          },
          {
            'id': 'delete',
            'value': 50
          }
        ]}
      />

    </div>
  )
}

export default UsersTable

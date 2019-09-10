import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import { APP_CONFIG } from '@app/constants'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import ReactTable from 'react-table'

const TripsTable = (props) => {
  const { onNavigateEdit, onNavigateShowModal, tripsArray } = props
  return (
    <div>

      <ReactTable
        filterable
        className='-striped -highlight'
        columns={[
          {
            Header: 'Info',
            columns: [
              {
                Header: 'UID',
                accessor: 'userId',
                width: 275
              },
              {
                id: 'date',
                Header: 'Date',
                accessor: date => {
                  return moment.unix(date.date.seconds)
                    .format('DD MMM YYYY')
                }
              },
              {
                Header: 'Distance',
                accessor: 'distance'
              },
              {
                Header: 'Duration',
                accessor: 'duration'
              },
              {
                Header: 'From',
                accessor: 'from'
              },
              {
                Header: 'To',
                accessor: 'to'
              },
              {
                id: 'nb',
                Header: 'Number of Trip Points',
                accessor: tripPoints => {
                  return tripPoints.tripPoints
                    ? tripPoints.tripPoints.length
                    : 0
                },
                width: 175
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
                Cell: row => <Button variant='warning' onClick={() => onNavigateEdit(row.value)}><FontAwesomeIcon icon={faPen} /></Button>
              },
              {
                Header: '',
                id: 'delete',
                accessor: 'id',
                // eslint-disable-next-line react/jsx-no-bind
                Cell: row => <Button variant='danger' onClick={() => onNavigateShowModal(row.value)}><FontAwesomeIcon icon={faTrash} /></Button>
              }
            ]
          }
        ]}
        data={tripsArray}
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

export default TripsTable

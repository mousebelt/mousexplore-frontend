import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import Operation from './Operation'
import Spinner from 'components/Spinner/Spinner';

const OperationTable = props => (
  <div className="nrl__operations">
    {
      props.isLoading ? (
        <Spinner/>
      ) : (
        <table
          id="operation-table"
          className="nrl__operations-table"
        >
          <thead>
            <tr>
              <th>
                <FormattedMessage id="account" />
              </th>
              <th>
                <FormattedMessage id="operation" />
              </th>
              {props.compact === false && (
                <th>
                  <FormattedMessage id="transaction" />
                </th>
              )}
              <th>
                <FormattedMessage id="time" />
              </th>
            </tr>
          </thead>
          <tbody>
            {props.records.map(op => (
              <Operation
                key={op.id}
                compact={props.compact}
                op={op}
                parentRenderTimestamp={props.parentRenderTimestamp}
              />
            ))}
          </tbody>
        </table>
      )
    }
  </div>
)

OperationTable.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

export default OperationTable
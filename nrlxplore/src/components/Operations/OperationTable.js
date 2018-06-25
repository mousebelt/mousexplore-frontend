import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import {FormattedMessage} from 'react-intl'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'

import Operation from './Operation'

const OperationTable = props => (
  <table
    id="operation-table"
    className="table-striped table-hover table-condensed"
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
        <th />
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

OperationTable.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
}

export default OperationTable
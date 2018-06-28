import React from 'react'
import PropTypes from 'prop-types'
import { shortHash } from 'core/utils'
import HashLink from 'components/HashLink/HashLink'

const TransactionHash = ({hash, compact = true}) => {
  const hashLabel = compact ? shortHash(hash) : hash
  const className = !compact ? 'monospace' : ''
  return (
    <span title={hash} className={className}>
      <HashLink hash={hash} type="transaction">{hashLabel}</HashLink>
    </span>
  )
}
TransactionHash.propTypes = {
  hash: PropTypes.string.isRequired,
  compact: PropTypes.bool,
}

export default TransactionHash

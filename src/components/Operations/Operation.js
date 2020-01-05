import React from 'react'
import PropTypes from 'prop-types'

import AccountLink from './shared/AccountLink'
import TimeSynchronisedFormattedRelative from './shared/TimeSynchronizedFormattedRelative'
import TransactionHash from './shared/TransactionHash'

import AccountMerge from './AccountMerge'
import AllowTrust from './AllowTrust'
import ChangeTrust from './ChangeTrust'
import CreateAccount from './CreateAccount'
import Inflation from './Inflation'
import ManageData from './ManageData'
import Offer from './Offer'
import PathPayment from './PathPayment'
import Payment from './Payment'
import SetOptions from './SetOptions'

/**
    Stellar API - Operation:
    https://stellar.github.io/js-stellar-base/Operation.html
**/
/** 
    Note: 11/1/19
    Stellar API deprecated `manage_offer`.
    Updated to `manage_buy_offer` and `manage_sell_offer`.
**/
const opTypeComponentMap = {
  account_merge: AccountMerge,
  allow_trust: AllowTrust,
  change_trust: ChangeTrust,
  create_account: CreateAccount,
  create_passive_offer: Offer,
  create_passive_sell_offer: Offer,
  inflation: Inflation,
  manage_data: ManageData,
  manage_buy_offer: Offer,
  manage_sell_offer: Offer,
  manage_offer: Offer,
  manage_sell_offer: Offer,
  manage_buy_offer: Offer,
  path_payment: PathPayment,
  payment: Payment,
  set_options: SetOptions,
}

const opTypes = Object.keys(opTypeComponentMap)

const SubOperation = ({op}) => {
  const SubOpComponent = opTypeComponentMap[op.type]
  return <SubOpComponent {...op} />
}

const Operation = ({compact, op, parentRenderTimestamp}) => {
  const acc =
    op.type !== 'account_merge' ? (
      <AccountLink account={op.sourceAccount} />
    ) : (
      <span title={op.sourceAccount}>{op.sourceAccount.substring(0, 4)}</span>
    )

  return (
    <tr key={op.id} className="operation">
      <td className="account-badge">{acc}</td>
      <td>
        <SubOperation op={op} />
      </td>
      {compact === false && (
        <td>
          <TransactionHash hash={op.transactionHash} compact={true} />
        </td>
      )}
      <td>
        <span title={op.time}>
          <TimeSynchronisedFormattedRelative
            initialNow={parentRenderTimestamp}
            value={op.time}
          />
        </span>
      </td>
    </tr>
  )
}

Operation.defaultProps = {
  compact: true,
}

Operation.propTypes = {
  compact: PropTypes.bool,
  op: PropTypes.shape({
    id: PropTypes.string.isRequired,
    links: PropTypes.object.isRequired,
    sourceAccount: PropTypes.string.isRequired,
    type: PropTypes.oneOf(opTypes).isRequired,
    time: PropTypes.string,
  }).isRequired,
  parentRenderTimestamp: PropTypes.number,
}

export default Operation

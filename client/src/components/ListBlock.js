import { upperFirst } from 'lodash'
import React, { Fragment } from 'react'
import '../styles/ListBlock.scss'
import { formatUnit, formatValue } from '../utils/properties'
import { camelCaseToWords } from '../utils/strings'
import PinButton from './PinButton'

export default function ListBlock({ property }) {
  const renderValues = () => {
    if (Array.isArray(property.data)) {
      return (
        <Fragment>
          {property.data.map((item, key) => (
            <div className="ListBlockValue" key={key}>
              {camelCaseToWords(item.data[property.config.items[0].name])}:{' '}
              {camelCaseToWords(item.data[property.config.items[1].name])}
            </div>
          ))}
        </Fragment>
      )
    }

    if (typeof property?.data?.value === 'object') {
      return Object.entries(property?.data?.value).map(
        ([itemName, itemValue]) => (
          <div className="ListBlockValue" key={`${itemName}-${itemValue}`}>
            {camelCaseToWords(itemName)}: {formatValue(itemValue)}
          </div>
        )
      )
    }

    return (
      <Fragment>
        {formatValue(property?.data?.value)} {formatUnit(property?.data?.unit)}
      </Fragment>
    )
  }

  return (
    <div className="ListBlock">
      <div className="ListBlockCapability">
        {upperFirst(
          camelCaseToWords(property.config.capabilityName).toLowerCase()
        )}
      </div>
      <div className="ListBlockProperty">{property.config.name_pretty}</div>
      <div className="ListBlockValues">{renderValues()}</div>
      <PinButton propertyId={property.id} />
    </div>
  )
}
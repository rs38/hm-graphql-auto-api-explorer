import React, { Fragment, useState } from 'react'
import '../styles/Header.scss'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as FilterSvg } from '../images/filter.svg'
import { useMobx } from '../store/mobx'
import FilterPropertiesModal from './FilterPropertiesModal'
import Dropdown from './Dropdown'
import { VIEWS } from '../store/Config'
import { upperFirst } from 'lodash'
import { observer } from 'mobx-react-lite'

const Header = () => {
  const { properties, config, vehicles } = useMobx()
  const [showFilterModal, setShowFilterModal] = useState(false)

  const viewDropdownItems = [
    {
      value: VIEWS.GRID,
      renderLabel: () => 'Grid view',
      onClick: () => config.setView(VIEWS.GRID),
    },
    {
      value: VIEWS.LIST,
      renderLabel: () => 'List view',
      onClick: () => config.setView(VIEWS.LIST),
    },
    {
      value: VIEWS.MAP,
      renderLabel: () => 'Map view',
      onClick: () => config.setView(VIEWS.MAP),
    },
  ]

  const updateFrequencyDropdownItems = [
    {
      value: 5,
      renderLabel: () => 'Every 5 seconds',
      onClick: () => config.setUpdateFrequency(5),
    },
    {
      value: 10,
      renderLabel: () => 'Every 10 seconds',
      onClick: () => config.setUpdateFrequency(10),
    },
    {
      value: 15,
      renderLabel: () => 'Every 15 seconds',
      onClick: () => config.setUpdateFrequency(15),
    },
  ]

  const vehicleDropdownItems = vehicles.list.map((vehicle) => ({
    value: vehicle.id,
    renderLabel: () => (
      <Fragment>
        <div className="HeaderVehicleSelectDropdownBrand">{vehicle.brand}</div>
        <div className="HeaderVehicleSelectDropdownVin">{vehicle.vin}</div>
      </Fragment>
    ),
    onClick: () => {
      config.setSelectedVehicle(vehicle.id)
    },
  }))

  const selectedVehicle = vehicles.list.find(
    (vehicle) => vehicle.id === config.selectedVehicleId
  )

  return (
    <div className={`Header`}>
      <div className="HeaderVehicleSelect">
        <Dropdown
          value={config.selectedVehicleId}
          renderLabel={() => (
            <Fragment>
              <div className="HeaderVehicleSelectButtonBrand">
                {selectedVehicle?.brand?.toLowerCase()}
              </div>
              <div className="HeaderVehicleSelectButtonVin">
                {selectedVehicle?.vin}
              </div>
            </Fragment>
          )}
          items={vehicleDropdownItems}
        />
      </div>
      <PrimaryButton
        className="HeaderFilterButton"
        onClick={() => setShowFilterModal(!showFilterModal)}
      >
        <FilterSvg />
        <span>Filter properties</span>
      </PrimaryButton>
      <div className="HeaderShownPropertiesCount">
        {config.shownProperties.length} properties shown
      </div>
      <Dropdown
        className="HeaderViewDropdown"
        value={config.view}
        renderLabel={() => upperFirst(`${config.view} view`.toLowerCase())}
        items={viewDropdownItems}
      />
      <Dropdown
        className="HeaderFrequencyDropdown"
        value={config.updateFrequency}
        renderLabel={() => `Update every ${config.updateFrequency}s`}
        items={updateFrequencyDropdownItems}
      />
      <FilterPropertiesModal
        show={showFilterModal}
        close={() => setShowFilterModal(false)}
      />
    </div>
  )
}

export default observer(Header)

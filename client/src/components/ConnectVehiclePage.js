import { observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMobx } from '../store/mobx'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'

function ConnectVehiclePage() {
  const { initialConfig } = useMobx()
  const oAuthUrl = new URL(initialConfig.authUrl)
  oAuthUrl.searchParams.set('client_id', initialConfig.clientId)
  oAuthUrl.searchParams.set('app_id', initialConfig.appId)
  oAuthUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:8080/auth/callback'
  )

  return (
    <div className="ConnectVehiclePage">
      <div className="ConnectVehiclePageContent">
        <h2 className="Header">Connect your vehicle</h2>
        <GrayCircles />
        <a href={oAuthUrl.toString()}>
          <PrimaryButton>Add my first vehicle</PrimaryButton>
        </a>
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)

import { useState, useEffect } from 'react'
import networkMapping from '../chain-info/deployments/map.json'
import { MintCards } from "./MintCards"
import { MyCards } from "./MyCards"
import { SearchCards } from "./SearchCards"
import { Box, Tabs, Tab, Container, Button } from '@mui/material'
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { makeStyles } from '@mui/styles'
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useMoralis,
} from 'react-moralis'
import { MintOrViewCards } from './MintCards'

const useStyles = makeStyles(() => ({
  title: {
    color: "black",
    textAlign: 'center',
    padding: 4,
    fontSize: '2rem', // relative to the base root html element
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "blue"
  }
}))

const tabOptions = [
  "mint cards",
  "my cards",
  "search cards"
]

// shouldn't export since only using it here
export const isValidNetwork = (network) => {
  if (networkMapping.hasOwnProperty(network)) {
    return true
  }
  return false
}

export const Main = () => {

  const classes = useStyles()
  const { Web3Api } = useMoralisWeb3Api()
  const { web3, isWeb3Enabled, Moralis, user, isAuthenticated, enableWeb3 } = useMoralis()

  const getChain = async () => {
    if (isAuthenticated && isWeb3Enabled) {
      return await web3.eth.getChainId()
    }
    return null
  }

  const [selectedTab, setSelectedTab] = useState(tabOptions[0])
  const [networkId, setNetworkId] = useState(null)

  useEffect(() => {
    getChain().then(setNetworkId)
  }, [isWeb3Enabled])

  Moralis.onChainChanged(async () => {
    getChain().then(setNetworkId)
  })

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab)
  }

  const retroCatsAddress = isValidNetwork(networkId) ? networkMapping[networkId.toString()]['RetroCards'][0] : "0x0000000000000000000000000000000000000000"
  return (
    <div>
      {isAuthenticated && isWeb3Enabled ?
        isValidNetwork(networkId) ?
          <Container>
            <TabContext value={selectedTab.toString()}>
              <TabList centered onChange={handleTabChange} aria-label="cards-tab">
                {tabOptions.map((tabOption) => {
                  return (<Tab label={tabOption} value={tabOption} key={tabOption} />)
                })}
              </TabList>
              {tabOptions.map((tabOption) => {
                return (<TabPanel className={classes.tabContent} value={tabOption} key={tabOption}>
                  {tabOption === "mint cards" ? <MintCards networkId={networkId} retroCardsAddress={retroCatsAddress} /> : tabOption === "my cats" ? <MyCats networkId={networkId} retroCatsAddress={retroCatsAddress} /> : <SearchCats networkId={networkId} retroCatsAddress={retroCatsAddress} />}
                </TabPanel>)
              })}
            </TabContext>
          </Container> :
          <div className={classes.title}>
            Please connected to a supported chain (Mainnet)!
            <Button
              onClick={() => { Moralis.switchNetwork("0x1"); window.location.reload(false) }}
              variant='contained'>
              Change to Mainnet
            </Button>
          </div> :
        <div className={classes.title}>Please Connect Metamask and Login!</div>
      }
    </div >
  ) // as you scale you want to have one place to render errors
}

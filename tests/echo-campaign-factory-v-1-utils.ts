import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CampaignCreated,
  ImplementationChanged
} from "../generated/EchoCampaignFactoryV1/EchoCampaignFactoryV1"

export function createCampaignCreatedEvent(
  clonedCampaign: Address,
  owner: Address,
  implementation: Address,
  name: string,
  applicationFee: BigInt,
  EchoMarketData: string,
  totalClonedCampaigns: BigInt,
  initCampaign: ethereum.Tuple
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "clonedCampaign",
      ethereum.Value.fromAddress(clonedCampaign)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "applicationFee",
      ethereum.Value.fromUnsignedBigInt(applicationFee)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "EchoMarketData",
      ethereum.Value.fromString(EchoMarketData)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalClonedCampaigns",
      ethereum.Value.fromUnsignedBigInt(totalClonedCampaigns)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "initCampaign",
      ethereum.Value.fromTuple(initCampaign)
    )
  )

  return campaignCreatedEvent
}

export function createImplementationChangedEvent(
  lastImplementation: Address,
  newImplementation: Address
): ImplementationChanged {
  let implementationChangedEvent =
    changetype<ImplementationChanged>(newMockEvent())

  implementationChangedEvent.parameters = new Array()

  implementationChangedEvent.parameters.push(
    new ethereum.EventParam(
      "lastImplementation",
      ethereum.Value.fromAddress(lastImplementation)
    )
  )
  implementationChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newImplementation",
      ethereum.Value.fromAddress(newImplementation)
    )
  )

  return implementationChangedEvent
}

import { BigInt } from "@graphprotocol/graph-ts";
import { CampaignCreated as CampaignCreatedEvent } from "../generated/EchoCampaignFactoryV2/EchoCampaignFactoryV2";
import { EchoMarket, Campaign } from "../generated/schema";
import { EchoCampaign } from "../generated/templates";

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  EchoCampaign.create(event.params.clonedCampaign);

  let echoMarket = EchoMarket.load("EchoMarketData");

  if (!echoMarket) {
    echoMarket = new EchoMarket("EchoMarketData");
    echoMarket.totalPostsV1 = BigInt.zero();
    echoMarket.totalPostsV2 = BigInt.zero();
    echoMarket.totalEligibleContentsV1 = BigInt.zero();
    echoMarket.totalEligibleContentsV2 = BigInt.zero();
    echoMarket.totalEffectiveKPIsV1 = BigInt.zero();
    echoMarket.totalEffectiveKPIsV2 = BigInt.zero();
  }

  echoMarket.totalCampaigns = event.params.totalClonedCampaigns;

  let campaign = new Campaign(event.params.clonedCampaign);

  let clonedCampaign = event.params.clonedCampaign;
  let implementation = event.params.implementation;
  let name = event.params.name;
  let applicationFee = event.params.applicationFee;
  let owner = event.params.owner;

  let initCampaign = event.params.initCampaign;
  let startTime = initCampaign.startTime;
  let endTime = initCampaign.endTime;
  let refundAddress = initCampaign.refundAddress;
  let ipfsCID = initCampaign.ipfsCID;

  let budgetInfo = initCampaign.budgetInfo;
  let maxPerPost = budgetInfo.maxPerPost;
  let reservedAmount = budgetInfo.reservedAmount;
  let token = budgetInfo.token;

  let socialKPIs = initCampaign.socialKPIs;
  let social = socialKPIs.social;

  campaign.clonedCampaign = clonedCampaign;
  campaign.implementation = implementation;
  campaign.name = name;
  campaign.campaignCreator = owner;
  campaign.startTime = startTime;
  campaign.endTime = endTime;
  campaign.socialMedia = social;
  campaign.budgetToken = token;
  campaign.budgetSize = reservedAmount;
  campaign.maxPerPost = maxPerPost;
  campaign.refundAddress = refundAddress;
  campaign.applicationFee = applicationFee;
  campaign.ipfsCID = ipfsCID;

  campaign.totalPosts = BigInt.zero();
  campaign.isPaused = false;
  campaign.isFinalized = false;
  campaign.isClaimable = false;
  campaign.lastDonateAmount = BigInt.zero();
  campaign.lastPostTime = BigInt.zero();
  campaign.lastUpdatedTime = BigInt.zero();
  campaign.totalEffectiveKPIs = BigInt.zero();
  campaign.totalEligibleContents = BigInt.zero();
  campaign.totalPaidAmount = BigInt.zero();

  echoMarket.save();
  campaign.save();
}

import { BigInt } from "@graphprotocol/graph-ts";
import {
  ContentApplied as ContentAppliedEvent,
  ContentConfigAdded as ContentConfigAddedEvent,
  ContentQAoverallScore as ContentQAoverallScoreEvent,
  NewQualificationSettled as NewQualificationSettledEvent,
  ReadyForKPIupdates as ReadyForKPIupdatesEvent,
  KPIupdated as KPIupdatedEvent,
  ContentTotalKPIupdated as ContentTotalKPIupdatedEvent,
  ContentEffectiveKPIupdated as ContentEffectiveKPIupdatedEvent,
} from "../generated/EchoContentsV2/EchoContentsV2";
import {
  EchoMarket,
  Campaign,
  Content,
  ContentAdditionalData,
} from "../generated/schema";

export function handleContentAppliedV2(event: ContentAppliedEvent): void {
  let echoMarket = EchoMarket.load("EchoMarketData");
  let campaign = Campaign.load(event.params.campaign);
  let content = new Content(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
  );

  if (echoMarket) {
    echoMarket.totalPostsV2 = event.params.totalPosts;

    echoMarket.save();
  }

  if (campaign) {
    campaign.lastPostTime = event.params.lastPostTime;
    campaign.totalPosts = event.params.campaignTotalPosts;

    campaign.save();
  }

  content.campaign = event.params.campaign;
  content.content = event.params.contentLink;
  content.postTime = event.params.lastPostTime;
  content.contentTotalKPI = BigInt.zero();
  content.lastUpdatedTime = BigInt.zero();
  content.contentEffectiveKPI = BigInt.zero();
  content.contentTotalQAscore = BigInt.zero();
  content.claimedAmount = BigInt.zero();
  content.isClaimed = false;
  content.isReadyForKPIs = false;
  content.maxPerPost = event.params.campaignMaxPerPost;
  content.timestamp_ = event.block.timestamp;

  content.save();
}

export function handleContentConfigAddedV2(
  event: ContentConfigAddedEvent
): void {
  let contentAdditionalData = ContentAdditionalData.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
      .concat("_CONFIG: ")
      .concat(event.params.newConfig.kind)
  );

  if (!contentAdditionalData) {
    contentAdditionalData = new ContentAdditionalData(
      event.params.contentLink
        .concat(":")
        .concat(event.params.campaign.toHexString())
        .concat("_CONFIG: ")
        .concat(event.params.newConfig.kind)
    );

    contentAdditionalData.timestamp_ = event.block.timestamp;
  }

  contentAdditionalData.configName = "CONFIG: ".concat(
    event.params.newConfig.kind
  );
  contentAdditionalData.configValue =
    event.params.newConfig.value.toHexString();
  contentAdditionalData.campaign = event.params.campaign;
  contentAdditionalData.contentLink = event.params.contentLink;
  contentAdditionalData.oracle = event.params.oracle;
  contentAdditionalData.timestamp_ = event.block.timestamp;

  contentAdditionalData.save();
}

export function handleContentQAoverallScoreV2(
  event: ContentQAoverallScoreEvent
): void {
  let content = Content.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
  );

  if (!content) {
    content = new Content(
      event.params.contentLink
        .concat(":")
        .concat(event.params.campaign.toHexString())
    );

    content.contentTotalQAscore = event.params.QAoverallScore;
    content.timestamp_ = event.block.timestamp;
  }

  content.save();
}

export function handleNewQualificationSettledV2(
  event: NewQualificationSettledEvent
): void {
  let contentAdditionalData = ContentAdditionalData.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
      .concat("_")
      .concat(event.params.qaMethodKind)
  );

  if (!contentAdditionalData) {
    contentAdditionalData = new ContentAdditionalData(
      event.params.contentLink
        .concat(":")
        .concat(event.params.campaign.toHexString())
        .concat("_")
        .concat(event.params.qaMethodKind)
    );

    contentAdditionalData.timestamp_ = event.block.timestamp;
  }

  contentAdditionalData.qaMethodKind = event.params.qaMethodKind;
  contentAdditionalData.pctScore = event.params.pctScore;
  contentAdditionalData.campaign = event.params.campaign;
  contentAdditionalData.contentLink = event.params.contentLink;
  contentAdditionalData.oracle = event.params.oracle;

  contentAdditionalData.save();
}

export function handleReadyForKPIupdatesV2(
  event: ReadyForKPIupdatesEvent
): void {
  let content = Content.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
  );

  if (content) {
    content.isReadyForKPIs = true;
    content.save();
  }
}

export function handleKPIupdatedV2(event: KPIupdatedEvent): void {
  let campaign = Campaign.load(event.params.campaign);
  let contentAdditionalData = ContentAdditionalData.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
      .concat("_")
      .concat(event.params.socialKindKPI)
  );

  if (!contentAdditionalData) {
    contentAdditionalData = new ContentAdditionalData(
      event.params.contentLink
        .concat(":")
        .concat(event.params.campaign.toHexString())
        .concat("_")
        .concat(event.params.socialKindKPI)
    );

    contentAdditionalData.timestamp_ = event.block.timestamp;
  }

  if (campaign) {
    campaign.lastUpdatedTime = event.params.lastCampaignUpdateTime;

    campaign.save();
  }

  contentAdditionalData.socialKindKPI = event.params.socialKindKPI;
  contentAdditionalData.kpiAmount = event.params.kpiAmount;
  contentAdditionalData.campaign = event.params.campaign;
  contentAdditionalData.contentLink = event.params.contentLink;
  contentAdditionalData.oracle = event.params.oracle;

  contentAdditionalData.save();
}

export function handleContentTotalKPIupdatedV2(
  event: ContentTotalKPIupdatedEvent
): void {
  let content = Content.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
  );

  if (content) {
    content.contentTotalKPI = event.params.contentTotalKPI;

    content.save();
  }
}

export function handleContentEffectiveKPIupdatedV2(
  event: ContentEffectiveKPIupdatedEvent
): void {
  let echoMarket = EchoMarket.load("EchoMarketData");
  let campaign = Campaign.load(event.params.campaign);
  let content = Content.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
  );

  if (echoMarket) {
    echoMarket.totalEligibleContentsV2 = event.params.totalEligibleContents;
    echoMarket.totalEffectiveKPIsV2 = event.params.totalEffectiveKPIs;

    echoMarket.save();
  }

  if (campaign) {
    campaign.totalEffectiveKPIs = event.params.campaignTotalEffectiveKPIs;
    campaign.totalEligibleContents = event.params.campaignTotalEligibleContents;

    campaign.save();
  }

  if (content) {
    content.lastUpdatedTime = event.params.lastUpdatedTime;
    content.contentEffectiveKPI = event.params.contentEffectiveKPI;

    content.save();
  }
}

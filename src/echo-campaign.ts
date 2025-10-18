import {
  CampaignPauseToggled as CampaignPauseToggledEvent,
  BudgetIncreased as BudgetIncreasedEvent,
  CampaignFinalized as CampaignFinalizedEvent,
  Claimed as ClaimedEvent,
  CampaignFinished as CampaignFinishedEvent,
} from "../generated/templates/EchoCampaign/EchoCampaign";
import { Campaign, Content } from "../generated/schema";

export function handleCampaignPauseToggled(
  event: CampaignPauseToggledEvent
): void {
  let campaign = Campaign.load(event.params.campaign);

  if (campaign) {
    campaign.isPaused = event.params.paused;

    campaign.save();
  }
}

export function handleBudgetIncreased(event: BudgetIncreasedEvent): void {
  let campaign = Campaign.load(event.params.campaign);

  if (campaign) {
    campaign.budgetSize = event.params.newBudget;
    campaign.lastDonateAmount = event.params.addedAmount;

    campaign.save();
  }
}

export function handleCampaignFinalized(event: CampaignFinalizedEvent): void {
  let campaign = Campaign.load(event.params.campaign);

  if (campaign) {
    campaign.isClaimable = true;

    campaign.save();
  }
}

export function handleClaimed(event: ClaimedEvent): void {
  let campaign = Campaign.load(event.params.campaign);
  let content = Content.load(
    event.params.contentLink
      .concat(":")
      .concat(event.params.campaign.toHexString())
  );

  if (campaign) {
    campaign.totalPaidAmount = event.params.totalPaidAmount;

    campaign.save();
  }

  if (content) {
    content.claimedAmount = event.params.rewardedAmount;
    content.isClaimed = true;

    content.save();
  }
}

export function handleCampaignFinished(event: CampaignFinishedEvent): void {
  let campaign = Campaign.load(event.params.campaign);

  if (campaign) {
    campaign.isFinalized = true;

    campaign.save();
  }
}

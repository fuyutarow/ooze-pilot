module bumpwin_pilot::outcome_share;

use sui::balance::{Self, Supply};

public struct OutcomeShare<phantom Outcome> has drop {}

public fun new_supply<Outcome>(): Supply<OutcomeShare<Outcome>> {
    balance::create_supply(OutcomeShare<Outcome> {})
}

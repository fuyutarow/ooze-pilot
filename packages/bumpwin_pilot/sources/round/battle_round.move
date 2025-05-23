module bumpwin_pilot::battle_round;

use bumpwin_pilot::meme_registry::{Self, MemeRegistry};
use bumpwin_pilot::round_phase::{Self, RoundPhase};
use sui::balance::Balance;
use sui::clock::Clock;
use sui::event;

public struct BattleRound has key, store {
    id: UID,
    round: u64,
    meme_registry: MemeRegistry,
    start_timestamp_ms: u64,
}

public struct NewRoundEvent has copy, drop {
    id: ID,
    round: u64,
}

public(package) fun new(round: u64, start_timestamp_ms: u64, ctx: &mut TxContext): BattleRound {
    let battle_round = BattleRound {
        id: object::new(ctx),
        round,
        meme_registry: meme_registry::new(ctx),
        start_timestamp_ms,
    };

    event::emit(NewRoundEvent {
        id: battle_round.id.to_inner(),
        round: battle_round.round,
    });

    battle_round
}

public fun phase(self: &BattleRound, clock: &Clock): RoundPhase {
    round_phase::round_phase(self.start_timestamp_ms, clock)
}

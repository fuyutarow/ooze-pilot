module bumpwin_pilot::account_book;

use bumpwin_pilot::account::{Self, Account};
use sui::table::{Self, Table};

public struct AccountBook has store {
    accounts: Table<address, Account>,
    num_accounts: u64,
}

public fun new(ctx: &mut TxContext): AccountBook {
    AccountBook {
        accounts: table::new(ctx),
        num_accounts: 0,
    }
}

public fun create_account(self: &mut AccountBook, ctx: &mut TxContext) {
    let account = account::new(ctx);
    self.accounts.add(ctx.sender(), account);
    self.num_accounts = self.num_accounts + 1;
}

public fun borrow_account(self: &AccountBook, address: address): &Account {
    self.accounts.borrow(address)
}

public fun borrow_mut_account(self: &mut AccountBook, address: address): &mut Account {
    self.accounts.borrow_mut(address)
}

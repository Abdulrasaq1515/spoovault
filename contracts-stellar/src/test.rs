#![cfg(test)]

use super::*;
use soroban_sdk::{env::Env, String, Address};

#[test]
fn test_register_public_key() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SpooVaultContract);
    let client = SpooVaultContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);
    env.mock_all_signatures();

    let pubkey = String::from_str(&env, "B64_STELLAR_PUBKEY_TEST");
    client.register_public_key(&user, &pubkey);

    let fetched = client.get_public_key(&user);
    assert_eq!(fetched, pubkey);
}

#[test]
fn test_create_vault() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SpooVaultContract);
    let client = SpooVaultContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let g1 = Address::generate(&env);
    let g2 = Address::generate(&env);
    env.mock_all_signatures();

    let name = String::from_str(&env, "Soroban Vault");
    let desc = String::from_str(&env, "Stellar Soroban Secure Vault");
    let guardians = soroban_sdk::vec![&env, g1, g2];

    let vault_id = client.create_vault(&creator, &name, &desc, &guardians, &2);
    assert_eq!(vault_id, 1);
}

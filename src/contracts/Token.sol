// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract Token {
  string public name = "Yuzu Token";
  string public symbol = "YUZU";
  uint256 public decimals = 18;
  uint256 public totalSupply;

  string public name = "My Name";

  constructor() public {
    totalSupply = 1000000 * (10 ** decimals);
}

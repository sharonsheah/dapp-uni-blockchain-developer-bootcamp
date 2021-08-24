import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import {
	loadBalances,
	depositEther,
	withdrawEther,
  depositToken,
  withdrawToken
} from "../store/interactions";
import {
	web3Selector,
	exchangeSelector,
	tokenSelector,
	accountSelector,
	etherBalanceSelector,
	tokenBalanceSelector,
	exchangeEtherBalanceSelector,
	exchangeTokenBalanceSelector,
	balancesLoadingSelector,
	etherDepositAmountSelector,
  etherWithdrawAmountSelector,
	tokenDepositAmountSelector,
  tokenWithdrawAmountSelector,
} from "../store/selectors";
import {
	etherDepositAmountChanged,
	etherWithdrawAmountChanged,
	tokenDepositAmountChanged,
	tokenWithdrawAmountChanged,
} from "../store/actions";

const showForm = (props) => {
	const {
		etherBalance,
		tokenBalance,
		exchangeEtherBalance,
		exchangeTokenBalance,
		dispatch,
		etherDepositAmount,
    etherWithdrawAmount,
		tokenDepositAmount,
    tokenWithdrawAmount,
		exchange,
		account,
		web3,
    token,
	} = props;

	return (
		<Tabs defaultActiveKey="deposit" className="bg-dark text-white">
			<Tab eventKey="deposit" title="Deposit" className="bg-dark">
				<table className="table table-dark table-sm small">
					<thead>
						<tr>
							<th>Token</th>
							<th>Wallet</th>
							<th>Exchange</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>ETH</td>
							<td>{etherBalance}</td>
							<td>{exchangeEtherBalance}</td>
						</tr>
					</tbody>
				</table>

        {/* Deposit Ether form */}
				<form
					className="row pb-4"
					onSubmit={(event) => {
						event.preventDefault();
						depositEther(dispatch, exchange, web3, etherDepositAmount, account);
					}}
				>
					<div className="col-12 col-sm pr-sm-2">
						<input
							type="text"
							placeholder="ETH Amount"
							onChange={(e) =>
								dispatch(etherDepositAmountChanged(e.target.value))
							}
							className="form-control form-control-sm bg-dark text-white"
							required
						/>
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button type="submit" className="btn btn-warning btn-block btn-sm">
							Deposit
						</button>
					</div>
				</form>

				<table className="table table-dark table-sm small">
					<tbody>
						<tr>
							<td>YUZU</td>
							<td>{tokenBalance}</td>
							<td>{exchangeTokenBalance}</td>
						</tr>
					</tbody>
				</table>

        {/* Deposit token form */}
				<form
					className="row"
					onSubmit={(event) => {
						event.preventDefault();
						depositToken(dispatch, exchange, web3, token, tokenDepositAmount, account);
					}}
				>
					<div className="col-12 col-sm pr-sm-2">
						<input
							type="text"
							placeholder="YUZU Amount"
							onChange={(e) =>
								dispatch(tokenDepositAmountChanged(e.target.value))
							}
							className="form-control form-control-sm bg-dark text-white"
							required
						/>
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button type="submit" className="btn btn-warning btn-block btn-sm">
							Deposit
						</button>
					</div>
				</form>
			</Tab>

			<Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
				<table className="table table-dark table-sm small">
					<thead>
						<tr>
							<th>Token</th>
							<th>Wallet</th>
							<th>Exchange</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>ETH</td>
							<td>{etherBalance}</td>
							<td>{exchangeEtherBalance}</td>
						</tr>
					</tbody>
				</table>

        {/* Withdraw Ether form */}
				<form
					className="row pb-4"
					onSubmit={(event) => {
						event.preventDefault();
						withdrawEther(
							dispatch,
							exchange,
							web3,
							etherWithdrawAmount,
							account
						);
					}}
				>
					<div className="col-12 col-sm pr-sm-2">
						<input
							type="text"
							placeholder="ETH Amount"
							onChange={(e) =>
								dispatch(etherWithdrawAmountChanged(e.target.value))
							}
							className="form-control form-control-sm bg-dark text-white"
							required
						/>
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button type="submit" className="btn btn-warning btn-block btn-sm">
							Withdraw
						</button>
					</div>
				</form>

				<table className="table table-dark table-sm small">
					<tbody>
						<tr>
							<td>YUZU</td>
							<td>{tokenBalance}</td>
							<td>{exchangeTokenBalance}</td>
						</tr>
					</tbody>
				</table>

        {/* Withdraw token form */}
        <form
					className="row"
					onSubmit={(event) => {
						event.preventDefault();
						withdrawToken(dispatch, exchange, web3, token, tokenWithdrawAmount, account);
					}}
				>
					<div className="col-12 col-sm pr-sm-2">
						<input
							type="text"
							placeholder="YUZU Amount"
							onChange={(e) =>
								dispatch(tokenWithdrawAmountChanged(e.target.value))
							}
							className="form-control form-control-sm bg-dark text-white"
							required
						/>
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button type="submit" className="btn btn-warning btn-block btn-sm">
							Withdraw
						</button>
					</div>
				</form>
			</Tab>
		</Tabs>
	);
};

class Balance extends Component {
	constructor(props) {
		super(props);
		this.loadBlockchainData();
	}

	async loadBlockchainData() {
		const { dispatch, exchange, web3, token, account } = this.props;
		await loadBalances(dispatch, web3, exchange, token, account);
	}

	render() {
		return (
			<div className="card bg-dark text-white">
				<div className="card-header">Balance</div>
				<div className="card-body">
					{this.props.showForm ? showForm(this.props) : <Spinner />}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const balancesLoading = balancesLoadingSelector(state);

	return {
		account: accountSelector(state),
		exchange: exchangeSelector(state),
		token: tokenSelector(state),
		web3: web3Selector(state),
		etherBalance: etherBalanceSelector(state),
		tokenBalance: tokenBalanceSelector(state),
		exchangeEtherBalance: exchangeEtherBalanceSelector(state),
		exchangeTokenBalance: exchangeTokenBalanceSelector(state),
		balancesLoading,
		showForm: !balancesLoading,
		etherDepositAmount: etherDepositAmountSelector(state),
		etherWithdrawAmount: etherWithdrawAmountSelector(state),
		tokenDepositAmount: tokenDepositAmountSelector(state),
		tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
	};
}

export default connect(mapStateToProps)(Balance);

import React, { Component } from "react";
import { connect } from "react-redux";
import { loadAllOrders, subscribeToEvents } from "../store/interactions";
import { exchangeSelector } from "../store/selectors";
import MyTransactions from "./MyTransactions";
import OrderBook from "./OrderBook";
import PriceChart from "./PriceChart";
import Trades from "./Trades";
import Balance from "./Balance";
import NewOrder from "./NewOrder";

class Content extends Component {
	constructor(props) {
		super(props);
		this.loadBlockchainData(props);
	}

	async loadBlockchainData(props) {
		const { exchange, dispatch } = props;

		await loadAllOrders(exchange, dispatch);
		await subscribeToEvents(exchange, dispatch);
	}

	render() {
		return (
			<div className="content">
				<div className="vertical-split">
					<Balance />
					<NewOrder />
				</div>
				<OrderBook />
				<div className="vertical-split">
					<PriceChart />
					<MyTransactions />
				</div>
				<Trades />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		exchange: exchangeSelector(state),
	};
}

export default connect(mapStateToProps)(Content);

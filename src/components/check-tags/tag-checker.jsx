import React from "react";
import "./styles.css";
export default class TagChecker extends React.Component {
	constructor(props) {
		super();
		this.state = {
			inputText: "",
			message: "",
			msgType: "",
		};
	}
	handleTextChange = (e) => {
		this.setState({ inputText: e.target.value, message: "", msgType: "" });
	};
	handleResetForm = () => {
		this.setState({ inputText: "", message: "", msgType: "" });
	};
	handleCheckTags = () => {
		let input = this.state.inputText;
		let tags = [];

		tags = input && input.match(/<[A-Z]>|<\/[A-Z]>/g);
		let len = tags && tags.length;

		let message = "";
		let msgType = "";
		if (!tags || len === 0) {
			message = "No tags found!";
			msgType = "info";
		} else if (len > 0) {
			let expectedEndTags = [];

			tags &&
				tags.forEach((val) => {
					let isClosingTag = val.indexOf("</");
					if (isClosingTag < 0) {
						let currentTagName = val.slice(1, -1);
						expectedEndTags.push(`</${currentTagName}>`);
					} else {
						let expectedEndTagsLen = expectedEndTags.length;
						if (!expectedEndTags[expectedEndTagsLen - 1]) {
							message = `Expected # found ${val}`;
							msgType = "error";
						} else {
							if (expectedEndTags[expectedEndTagsLen - 1] === val) {
								expectedEndTags.pop();
							} else {
								message = `Expected ${
									expectedEndTags[expectedEndTagsLen - 1]
								} found ${val}`;
								msgType = "error";
							}
						}
					}
				});
			if (!message) {
				if (expectedEndTags.length > 0) {
					message = `Expected ${
						expectedEndTags[expectedEndTags.length - 1]
					} found #`;
					msgType = "error";
				} else {
					message = "Correctly tagged paragraph";
					msgType = "success";
				}
			}
		}

		this.setState({ message, msgType });
	};
	render() {
		let messageClassName = "result-msg";
		switch (this.state.msgType && this.state.msgType) {
			case "info":
				messageClassName = "result-msg info";
				break;

			case "error":
				messageClassName = "result-msg red";
				break;
			case "success":
				messageClassName = "result-msg green";
				break;
			default:
				break;
		}

		return (
			<div className="container">
				<div className="title">{"Simple Tag Checker"}</div>
				<textarea
					className={"textinput"}
					rows={"10"}
					cols={"55"}
					value={this.state.inputText || ""}
					name="inputText"
					data-testid="text-para"
					onChange={this.handleTextChange}
				/>
				<div className="controls">
					<button
						type="submit"
						onClick={this.handleCheckTags}
						data-testid="submit">
						Check
					</button>
					<button type="reset" onClick={this.handleResetForm}>
						Clear
					</button>
				</div>

				{this.state.message && (
					<div className={messageClassName}>
						<p data-testid="message-text">{this.state.message}</p>
					</div>
				)}
			</div>
		);
	}
}

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/fileUpload.js';
import FileUploadForm from '../components/FileUpload/FileUploadForm.js';
import FileUploadResultView from '../components/FileUpload/FileUploadResultView.js';

class FileUpload extends React.Component {
	constructor(props) {
		super(props);

		this.timerId = null;
	}

	componentDidUpdate() {
		console.log(this.props.fileUpload.shouldViewResult);
		if(! this.props.fileUpload.shouldViewResult) return;

		clearTimeout(this.timerId);
		this.timerId = setTimeout(() => {
			this.props.dispatch(actions.hideResultView())
		}, 5000);
	}

	onFileInputChange(fileList) {
		this.props.dispatch(actions.addFiles(fileList));
	}

	onImageDeleteButtonClick(index) {
		this.props.dispatch(actions.deleteSelectedImage(index));
	}

	onNameInputChange(value, maxLength) {
		this.props.dispatch(actions.inputName(value, maxLength));
	}

	onAgeInputChange(value, max, min) {
		this.props.dispatch(actions.inputAge(value, max, min));
	}

	onTagInputChange(value, maxLength) {
		this.props.dispatch(actions.inputTag(value, maxLength, this.props.fileUpload.maxTagCount));
	}

	onTweetTextareaChange(value) {
		this.props.dispatch(actions.inputTweet(value, this.props.fileUpload.tweetMaxLength));
	}

	onSubmit(form) {
		const files = this.props.fileUpload.files;
		const actionURI = this.props.fileUpload.actionURI;
		this.props.dispatch(actions.submit(actionURI, files, form));
	}

	render() {
		const fileUpload = this.props.fileUpload;
		console.log(fileUpload);

		const resultView = (fileUpload.shouldViewResult)
			? <FileUploadResultView isSuccess={fileUpload.isSuccess} />
			: null;

		return (
			<div className="fileUpload">
				{resultView}
				<FileUploadForm
					onImageDeleteButtonClick={this.onImageDeleteButtonClick.bind(this)}
					selectedImages={fileUpload.selectedImages}
					onFileInputChange={this.onFileInputChange.bind(this)}
					onNameInputChange={this.onNameInputChange.bind(this)}
					onAgeInputChange={this.onAgeInputChange.bind(this)}
					onTagInputChange={this.onTagInputChange.bind(this)}
					tweetMaxLength={fileUpload.tweetMaxLength}
					onTweetTextareaChange={this.onTweetTextareaChange.bind(this)}
					possibleSubmit={fileUpload.possibleSubmit()}
					onSubmit={this.onSubmit.bind(this)}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		fileUpload: state.fileUpload,
	}
}

export default ReactRedux.connect(mapStateToProps)(FileUpload);
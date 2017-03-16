import React from 'react';
import * as ReactRedux from 'react-redux';
import classnames from 'classnames';
import * as actions from '../actions/contentsUpload.js';
import SelectedImageViewBox from '../components/ContentsUpload/SelectedImageViewBox.js';

class ContentsUpload extends React.Component {

	handleFileInputChange(e) {
		this.props.dispatch(actions.addFiles(e.target.files));
		e.target.value = '';
	}

	handleImageDeleteButtonClick(index) {
		this.props.dispatch(actions.deleteFile(index));
	}

	handleNameInputChange(e) {
		this.props.dispatch(actions.inputName(e.target.value));
	}

	handleAgeInputChange(e) {
		this.props.dispatch(actions.inputAge(e.target.value));
	}

	handleTagInputChange(e) {
		this.props.dispatch(actions.inputTag(e.target.value));
	}

	handleDescriptionTextareaChange(e) {
		this.props.dispatch(actions.inputDescription(e.target.value));
	}

	handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const files = this.props.contentsUpload.files;
		this.props.dispatch(actions.postContents(form, files));
	}

	render() {
		const contentsUpload = this.props.contentsUpload;
		const possibleSubmit = contentsUpload.possibleSubmit();

		return (
			<div className="contentsUpload">
				<form className="contentsUploadForm" onSubmit={::this.handleSubmit}>
					<input
						className={classnames({
							error: ! contentsUpload.validationFile,
						})}
						type="file"
						multiple
						accept={contentsUpload.allowedImageTypes.join()}
						onChange={::this.handleFileInputChange}
					/>
					<SelectedImageViewBox
						files={contentsUpload.files}
						handleImageDeleteButtonClick={::this.handleImageDeleteButtonClick}
					/>
					<label>名: 
						<input
							className={classnames({
								error: ! contentsUpload.validationName,
							})}
							type="text"
							name="name"
							onChange={::this.handleNameInputChange}
						/>
					</label>
					<select name="sex">
						<option value="none">性</option>
						<option value="male">♂</option>
						<option value="female">♀</option>
					</select>
					<label>年: 
						<input
							className={classnames({
								error: ! contentsUpload.validationAge,
							})}
							type="number"
							name="age"
							min={contentsUpload.ageMin}
							max={contentsUpload.ageMax}
							onChange={::this.handleAgeInputChange}
						/>
					</label>
					<label>タグ: 
						<input
							className={classnames({
								error: ! contentsUpload.validationTag,
							})}
							type="text"
							name="tag"
							onChange={::this.handleTagInputChange}
						/>
					</label>
					<label>
						<textarea
							className={classnames({
								error: ! contentsUpload.validationDescription,
							})}
							name="description"
							placeholder="説明"
							ref="description"
							onChange={::this.handleDescriptionTextareaChange}
						></textarea>
						<span className="characterCount">
							{contentsUpload.descriptionMaxLength - contentsUpload.description.trim().length}
						</span>
					</label>
					<button
						type="submit"
						value="Upload"
						disabled={! possibleSubmit}
					>Upload</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		contentsUpload: state.contentsUpload,
	}
}

export default ReactRedux.connect(mapStateToProps)(ContentsUpload);
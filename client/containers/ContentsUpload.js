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
							error: ! contentsUpload.validFile,
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
					<label><span>名前:</span> 
						<input
							className={classnames({
								error: ! contentsUpload.validName,
							})}
							type="text"
							name="name"
							value={contentsUpload.name}
							onChange={::this.handleNameInputChange}
						/>
					</label>
					<label>
						<span>性別:</span>
						<select name="sex">
							<option value="none">?</option>
							<option value="male">♂</option>
							<option value="female">♀</option>
						</select>
					</label>
					<label><span>年齢:</span>
						<input
							className={classnames({
								error: ! contentsUpload.validAge,
							})}
							type="number"
							name="age"
							min={contentsUpload.ageMin}
							max={contentsUpload.ageMax}
							value={contentsUpload.age}
							onChange={::this.handleAgeInputChange}
						/>
					</label>
					<label><span>タグ(スペース区切り,3つまで):</span>
						<input
							className={classnames({
								error: ! contentsUpload.validTag,
							})}
							type="text"
							name="tag"
							value={contentsUpload.tag}
							onChange={::this.handleTagInputChange}
						/>
					</label>
					<label>
						<span>一言(紹介文など):</span>
						<textarea
							className={classnames({
								error: ! contentsUpload.validDescription,
							})}
							name="description"
							value={contentsUpload.description}
							onChange={::this.handleDescriptionTextareaChange}
							ref="description"
						></textarea>
						<span className="characterCount">
							{contentsUpload.descriptionMaxLength - contentsUpload.description.trim().length}
						</span>
					</label>
					<button
						type="submit"
						disabled={! possibleSubmit}
					>アップロード</button>
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
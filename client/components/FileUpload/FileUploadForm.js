import React from 'react';
import ReactDOM from 'react-dom';
import SelectedImageViewBox from './SelectedImageViewBox.js';

export default class FileUploadForm extends React.Component {
	handleFileInputChange(e) {
		const input = e.target;
		this.props.onFileInputChange(input.files);
	}

	handleNameInputChange(e) {
		const input = e.target;
		this.props.onNameInputChange(input.value);
	}

	handleAgeInputChange(e) {
		const input = e.target;
		this.props.onAgeInputChange(input.value);
	}

	handleTagInputChange(e) {
		const input = e.target;
		this.props.onTagInputChange(input.value);
	}

	handleTextareaChange(e) {
		const textarea = e.target;
		const characterCount = ReactDOM.findDOMNode(this.refs.characterCount);
		characterCount.textContent = this.props.tweetMaxLength - textarea.value.trim().length;

		this.props.onTweetTextareaChange(textarea.value);
	}

	handleSubmit(e) {
		e.preventDefault();
		const form = ReactDOM.findDOMNode(this.refs.form);
		this.props.onSubmit(form);
	}



	render() {
		return (
			<form className="fileUploadForm" ref="form">
				<input
					type="file"
					multiple
					accept="image/jpeg,image/png,image/gif"
					onChange={this.handleFileInputChange.bind(this)}
				/>
				<SelectedImageViewBox
					images={this.props.selectedImages}
					onDeleteButtonClick={this.props.onImageDeleteButtonClick}
				/>
				<label>名: 
					<input
						type="text"
						name="name"
						maxLength={this.props.nameMaxLength}
						onChange={this.handleNameInputChange.bind(this)}
					/>
				</label>
				<select name="sex">
					<option value="none">性</option>
					<option value="male">♂</option>
					<option value="female">♀</option>
				</select>
				<label>年: 
					<input
						type="number"
						max={this.props.ageMax}
						min={this.props.ageMin}
						name="age"
						onChange={this.handleAgeInputChange.bind(this)}
					/>
				</label>
				<label>タグ: 
					<input
						type="text"
						name="tag"
						maxLength={this.props.tagMaxLength}
						onChange={this.handleTagInputChange.bind(this)}
					/>
				</label>
				<label>
					<textarea
						name="tweet"
						placeholder="コメント"
						ref="tweet"
						onChange={this.handleTextareaChange.bind(this)}
					></textarea>
					<span className="characterCount" ref="characterCount">{this.props.tweetMaxLength}</span>
				</label>
				<input
					type="submit"
					value="Upload"
					disabled={! this.props.possibleSubmit}
					onClick={this.handleSubmit.bind(this)}
				/>
			</form>
		);
	}
}
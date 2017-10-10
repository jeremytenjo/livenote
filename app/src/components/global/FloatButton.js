import React from 'react';
import styled from 'styled-components'

export default class FloatButton extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods

	render() {
		//Properties

		//Style

		const FloatingButtonCon = styled.div `
 color: rgba(0, 0, 0, 0.87);
 background-color: transparent;
 transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; box-sizing: border-box;
 font-family: Roboto, sans-serif;
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
 border-radius: 50%;
 display: inline-block;
  margin-right: 20px;
	cursor: pointer;
 	`;
		const FlatIconBtn = styled.button `
 		border: 10px; box-sizing:
		border-box; display:
		inline-block; font-family:
		Roboto, sans-serif;
		 -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		 cursor: pointer; text-decoration: none;
		  margin: 0px; padding: 0px; outline: none; font-size: inherit; font-weight: inherit; position: relative; vertical-align: bottom; z-index: 1;
			 background-color: #F71735;
			  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
			 height: 56px; width: 56px; overflow: hidden; border-radius: 50%; text-align: center;
 	 `;
		const FloatingButton = styled.div `
 transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; top: 0px;
 	`;
		const FlatIconSpan = styled.span `
 height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; overflow: hidden; pointer-events: none;
 	 `;
		const PlusSign = styled.svg `
 display: inline-block;
 color: rgb(255, 255, 255);
 fill: rgb(255, 255, 255);
 height: 56px;
 width: 24px;
 user-select: none;
 transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
 line-height: 56px;
 	 `;
		//Template
		return (
			<FloatingButtonCon>
				<FlatIconBtn tabindex="0" type="button">
					<div>
						<FlatIconSpan></FlatIconSpan>
						<FloatingButton>
							<PlusSign viewBox="0 0 24 24">
								<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
							</PlusSign>
						</FloatingButton>
					</div>
				</FlatIconBtn>
			</FloatingButtonCon>
		);
	}

}

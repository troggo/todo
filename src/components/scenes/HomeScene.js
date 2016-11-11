import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'

import styles, { colors } from '../styles'
import { Toolbar, StatusBar, ActionButton } from '../components'

import TodoList from '../todolist/TodoList'

export default class HomeScene extends Component {
	render() {
		return (
			<View style={ styles.scene }>
				<StatusBar backgroundColor={ colors.primaryColorDark }/>
				<Toolbar
					title='Todo List'
					titleColor={ colors.white }
					style={{ backgroundColor: colors.primaryColor }}
					overflowIconName="more-vert"
					actions={[
						{ title: "Check all items", iconName: "done-all", show: 'always' },
						{ title: "Remove checked items", iconName: "delete-sweep", show: 'always' },
						{ title: "Load mock data", show: 'never' },
					]}
					onActionSelected={ action => {
						switch (action) {
							case 0:
								// check all items in the list
								return this.props.changeItem(
									Object.keys(this.props.data),
									{ checked: true }
								)
							case 1:
								// remove all checked items in the list
								return this.props.removeItem(
									Object.keys(this.props.data)
										.filter(id => this.props.data[id].checked)
								)
							case 2:
								return this.props.resetData()
						}
					}}
				/>
				<TodoList
					data={ this.props.data }
					changeItem={ this.props.changeItem }
					removeItem={ this.props.removeItem }
					goToEditItem={ this.goToEditItem }
				/>

				<ActionButton icon="add" onPress={ this.goToAddItem } />
			</View>
		)
	}

	goToAddItem = () => {
		this.props.navigator.push({ id: 'add-item' })
	}

	goToEditItem = (itemId) => {
		this.props.navigator.push({ id: 'edit-item', itemId })
	}
}
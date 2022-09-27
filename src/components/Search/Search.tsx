import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Detail from "../Detail"
import '../../styles/style.scss'

const Search = (): JSX.Element => {
	const [userName, setUserName] = useState<string>("");
	const [selectedUser, setSelectedUser] = useState<string>("");
	const [btnClick, setBtnClick] = useState<boolean>(false);
	const getLocalStr: any = localStorage.getItem("names");
	const localStr = JSON.parse(getLocalStr) || [];
	const [users, setUsers] = useState<Array<any>>(localStr);

	const currentName: any = localStorage.getItem("currentName")
	useEffect(() => {
		const storeUserToLocalStorage = () => {
			localStorage.setItem("names", JSON.stringify(users));
		}
		storeUserToLocalStorage();
	}, [users]);
	useEffect(() => {
		const historyHandle = () => {
			if (currentName) {
				setBtnClick(true);
				setSelectedUser(currentName);
				localStorage.setItem("currentName", "");
			} else {
				setSelectedUser(userName)
			}
		}
		historyHandle()
	}, [currentName, userName])

	const onSearchClick = (): void => {
		setUsers([...users, { name: userName, time: Date.now() }]);
		setBtnClick(true);
	}

	const handleChange = (e: any): void => {
		setUserName(e.target.value);
		setBtnClick(false);
	}

	return (
		<section className="search-user-detail">
			<Container>
				<div className="search-bar">
					<h4>Search Github Users</h4>
					<input
						type="text"
						className="user-edit-box"
						placeholder="Input User Name..."
						onChange={handleChange}
					/>
					<button
						className="search-btn"
						onClick={onSearchClick}
					>
						Search
					</button>
				</div>
				{btnClick && (
					<Detail props={selectedUser} />
				)}
			</Container>
		</section>
	);
};

export default Search;

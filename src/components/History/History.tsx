import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../styles/style.scss'


const History = (): JSX.Element => {
	const [history, setHistory] = useState<Array<string>>([]);
	const [currName, setCurrName] = useState<string>("");

	const rowNum: number = 20;
	const [currentpage, setPage] = useState<number>(0);
	const indexOfLastRow: number = (currentpage + 1) * rowNum;
	const indexOfStartRow: number = indexOfLastRow - rowNum;
	const currentHistory: Array<any> = history?.slice(indexOfStartRow, indexOfLastRow);
	const lastPage = Math.ceil(history?.length / rowNum);

	useEffect(() => {
		let localStr: any = localStorage.getItem("names");
		let users: Array<string> = JSON.parse(localStr);
		setHistory(users)
	}, []);
	useEffect(() => {
		const storeUserToLocalStorage = () => {
			localStorage.setItem("currentName", currName);
		}
		storeUserToLocalStorage();
	}, [currName]);
	//@ts-ignore
	history.sort(function (a, b) { return b.time - a.time });

	const setCurrentName = (name: string): void => {
		setCurrName(name)
	}

	const handlePrevClick = (): void => {
		if (currentpage !== 0) {
			setPage(currentpage - 1);
		}
	};
	const handleNextClick = (): void => {
		if (currentpage !== lastPage - 1) {
			setPage(currentpage + 1);
		}
	};

	return (
		<section className="search-history">
			<Container>
				<Row>
					<Col md={2}></Col>
					<Col md={8}>
						<h3>Search History</h3>
						{currentHistory?.map((hst, i) => (
							<a href={`/`} className="" key={i}
								//@ts-ignore
								params={{ name: hst.name }}
								onClick={() => setCurrentName(hst.name)}>
								<div className="search-list" key={i} >
									<span className=""> {hst.name}</span>
								</div>
							</a>
						))}
						{(history?.length > rowNum) && (
							<div className="pagination-row">
								<div className="table-col col-prev-btn">
									<span>
										<span onClick={() => handlePrevClick()}>&larr;</span>
									</span>
								</div>
								<div className="table-col col-page">
									<span>
										<strong>{currentpage + 1}&nbsp; </strong> of{" "}
										<strong>{lastPage}</strong>
									</span>
								</div>
								<div className="table-col col-next-btn">
									<span>
										<span onClick={() => handleNextClick()}>&rarr;</span>
									</span>
								</div>
							</div>
						)}
					</Col>
					<Col md={2}></Col>
				</Row>
			</Container>
		</section>);
};

export default History;

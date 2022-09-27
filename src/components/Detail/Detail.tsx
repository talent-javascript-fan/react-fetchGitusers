import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GetUserData from "../../actions/GetUserData";
import GetRepoData from "../../actions/GetRepoData";
import '../../styles/style.scss'
interface Props {
	props: string;
}

const Detail = (props: Props): JSX.Element => {
	const propsName = props.props
	const [userDetail, setUserDetail] = useState<any>([]);
	const [repoDetail, setRepoDetail] = useState<Array<any>>([]);

	const rowNum: number = 3;
	const [currentpage, setPage] = useState<number>(0);
	const indexOfLastRow: number = (currentpage + 1) * rowNum;
	const indexOfStartRow: number = indexOfLastRow - rowNum;
	const currentRepoRows: Array<any> = repoDetail?.slice(indexOfStartRow, indexOfLastRow);
	const lastPage: number = Math.ceil(repoDetail?.length / rowNum);

	useEffect(() => {
		const dispatchAction = async (name: string) => {
			const userData: any = await GetUserData(name);
			const repoUrl: string = userData?.repos_url;
			const repoData: any = await GetRepoData(repoUrl);
			setRepoDetail((repoData));
			setUserDetail((userData));
		}
		dispatchAction(propsName);
		// eslint-disable-next-line
	}, [])

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
		<section className="search-user-detail">
			<Container>
				<Row>
					<Col md={3}>
						<div className="user-summary">
							<img className="avatar-img"
								src={userDetail?.avatar_url}></img>
							<div className="contents">
								<div className="user-detail">
									Name: {userDetail?.name}
								</div>
								<div className="user-detail">
									Email: {userDetail?.email}
								</div>
							</div>
						</div>
					</Col>
					<Col md={1}></Col>
					<Col md={8}>
						{repoDetail && (
							<div className="repo-info">
								<div className="repo-contents">
									<h3>Repositories</h3>
									{currentRepoRows?.map((repo, i: number) => (
										<div className="table-row" key={i} >
											<div className="table-col">
												<span className="col-info">NAME: {repo?.name}</span>
											</div>
											<div className="table-col">
												<a target="_blank" href={repo?.svn_url} className="col-info">URL: {repo?.svn_url}</a>
											</div>
											<div className="table-col">
												<span className="col-info">DES: {repo?.description}</span>
											</div>
										</div>
									))}
								</div>

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
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Detail;

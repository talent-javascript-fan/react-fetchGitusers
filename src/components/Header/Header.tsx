import { Container, Navbar } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import '../../styles/style.scss'

const Header = (): JSX.Element => {
	return (
		<header className="header">
			<Navbar expand="lg">
				<Container>
					<Navbar id="basic-navbar-nav">
						<Link to={`/`}>Search</Link>
						<Link to={`/history`}>History</Link>
					</Navbar>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

import SmallCard from "./SmallCard";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setFilters, filterUsers ,setUsers} from "./redux/features/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

function Home() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const team = useSelector((state) => state.team.item);
  let users = useSelector((state) => state.users.filteredUsers);
  const filters = useSelector((state) => state.users.filters);

  /*     SEARCH FUNCTION*/
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function searchMember(query, users) {
    const searchWords = query.toLowerCase().split(" ");
    const filteredMembers = users.filter((user) => {
      const memberName = user.first_name.toLowerCase();
      return searchWords.every((word) => memberName.includes(word));
    });
    return filteredMembers;
  }

  const submitHandler = (e) => {
    e.preventDefault();
  
    dispatch(setUsers(searchMember(searchTerm, users))) ;
   
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    dispatch(setFilters({ ...filters, [name]: value }));

    dispatch(filterUsers());
  };

  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;


  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    dispatch(setUsers(users.slice(startIndex, endIndex)));
  }

  return (
    <>
      <Container fluid>
        <Row className="p-3">
          <Col md={4}>
            <Link to='/'>
            </Link>
            <h2>Mohammad</h2>
          </Col>
          <Col md={4}>
            {" "}
            <Form
              className="form-inline my-2 my-lg-0 d-flex align-items-center"
              onSubmit={submitHandler}
            >
              <Input type="text" value={searchTerm} onChange={handleChange} />
              <Button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </Button>
            </Form>
          </Col>
          <Col
            md={4}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <p>
              {" "}
              <Link className="text-muted" to="/members">
                Team Members : {team.length}
              </Link>
            </p>
          </Col>
        </Row>

        <Row style={{ backgroundColor: "#eee" }} className="pt-5">
          <Col md={3}>
            <div>
              <label>Domain :</label>
              <select name="domain" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <hr />
            <div>
              <label>Gender:</label>
              <select name="gender" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <hr />
            <div>
              <label>
                Available:
                <input
                  type="checkbox"
                  name="available"
                  onChange={handleFilterChange}
                />
              </label>
            </div>
          </Col>
          {users.map((user, index) => {
            return <SmallCard key={index} data={user} />;
          })}
        </Row>
        <ResponsivePagination
          current={currentPage}
          total={pageSize}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
export default Home;

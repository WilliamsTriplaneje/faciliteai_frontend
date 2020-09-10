/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import api from "../../../services/api";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
// core components
import Header from "../../../components/Headers/Header.js";

class Tables extends React.Component {
  state = {
    companies: [],
  };
  async componentDidMount() {
    await api.get("/admin/companies")
      .then((result) => {
        this.setState({ companies: result.data });
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    function handleRead(id) {
      window.location = `/app/approval/${id}`;
    }

    const { companies } = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Prestadores</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome da empresa</th>
                      <th scope="col">CNPJ</th>
                      <th scope="col">Status</th>
                      <th scope="col">Prestador</th>
                      <th scope="col">função</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  {companies.map((comp) => (
                    <tbody key={comp._id}>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {comp.nameFantasy}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{comp.cnpj}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <span>
                              {companies.map((active) => {
                                if (active.isActive == true) {
                                  return (
                                    <span
                                      style={{
                                        borderBottom: "2px solid #00e595 ",
                                      }}
                                    >
                                      Conta Ativa
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span
                                      style={{
                                        borderBottom: "2px solid #fb6340 ",
                                      }}
                                    >
                                      Conta Inativa
                                    </span>
                                  );
                                }
                              })}
                            </span>
                          </Badge>
                        </td>
                        <td>{comp.firstName}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <Button
                                style={{
                                  background: "#00e595",
                                  color: "#fff",
                                }}
                                onClick={() => handleRead(comp._id)}
                              >
                                Analisar pedido
                              </Button>
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;

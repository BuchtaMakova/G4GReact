import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import authHeader from "../services/AuthHeader.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { HashLink } from "react-router-hash-link";
import { Calendar } from "primereact/calendar";
import format from "date-fns/format";

export default function (props) {
  const [account, setAcc] = useState([]);
  const [comments, setComments] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  function fetchData() {
    let jwt = localStorage.getItem("jwt");
    let username = localStorage.getItem("username");
    const API_URL = "https://localhost:7100/api/Users/ByUsername?name=";
    if (jwt != "" && username != "") {
      axios
        .get(API_URL + username, {
          headers: authHeader(),
        })
        .then((res) => {
          setAcc(res.data.contents);
          setComments(res.data.comments);
          setLoading(false);
        })
        .catch((res) => {
          if (res.response.status === 401) {
            props.setLogout();
            navigate("/");
          }
        });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();
  const bodyTemplate = (rowData) => {
    return (
      <HashLink
        to={"/Content/" + rowData.contentIdContent + "#" + rowData.idComment}
      >
        {rowData.text}
      </HashLink>
    );
  };

  const bodyTemplate2 = (rowData) => {
    return <Link to={"/Content/" + rowData.idContent}>{rowData.headline}</Link>;
  };

  const bodyTemplate3 = (rowData) => {
    return formatDate(rowData.posted);
  };

  function formatDate(param) {
    if (isNaN(new Date(param).getTime())) {
      // invalid date value
      return "";
    }
    let date = new Date(param);
    let offset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return format(date, "dd.MM.yyyy");
  }

  return (
    <div className="Content">
      <div style={{ marginBottom: "120px", marginTop: "120px" }}>
        <div className="numera">
          <label className="numero">{props.account.commentsPosted}</label>
          <label className="numero">{props.account.contentsPosted}</label>
        </div>
        <div className="lejbls">
          <label className="lejbl">Comments</label>
          <label className="lejbl">Contents</label>
        </div>
      </div>

      <Tabs
        defaultActiveKey="contents"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="contents" title="Contents">
          <div className="Category-container shadow">Your contents</div>
          <div className="SubCategory-container shadow mb-3">
            <DataTable
              value={account}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              filters={filters}
              globalFilterFields={["headline", "text", "date"]}
              emptyMessage="No contents found."
              header={header}
              loading={loading}
              removableSort
            >
              <Column
                field="headline"
                filterField="headline"
                header="NAME"
                sortable
                body={bodyTemplate2}
                className="tableOverflowName"
              ></Column>
              <Column
                field="text"
                header="TEXT"
                filterField="text"
                sortable
                className="tableOverflow"
              ></Column>
              <Column
                field="posted"
                filterField="date"
                header="DATE"
                sortable
                body={bodyTemplate3}
              ></Column>
            </DataTable>
          </div>
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <div className="Category-container shadow">Your comments</div>
          <div className="SubCategory-container shadow mb-3">
            <DataTable
              value={comments}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              filters={filters}
              globalFilterFields={["headline", "text", "posted"]}
              emptyMessage="No contents found."
              header={header}
              loading={loading}
            >
              <Column
                field="text"
                header="TEXT"
                filterField="text"
                sortable
                className="tableOverflow"
                body={bodyTemplate}
              ></Column>
              <Column
                field="posted"
                filterField="posted"
                header="DATE"
                sortable
              ></Column>
            </DataTable>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

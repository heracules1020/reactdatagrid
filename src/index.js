import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
import StatusModal from './modal';
import createRowData from "./createRowData";
import ImageFormatter from "./ImageFormatter";

import "./styles.css";



const COLUMN_WIDTH=140;

const selectors = Data.Selectors;
const defaultColumnProperties = {
  sortable: true,
  resizable:true,
};
const columns = [
  {
    key: "avatar",
    name: "Avatar",
    width: 60,
    frozen:true,
    filterable: true,
    formatter:ImageFormatter
  },
  {
    key: "firstName",
    name: "First Name",
    frozen: true,
    filterable: true,
    width: 100
  },
  {
    key: "lastName",
    name: "Last Name",
    filterable: true,
    frozen: true,
    width: 150
  },
  {
    key: "position",
    name: "Position",
    filterable: true,
    width: COLUMN_WIDTH
  },
  {
    key: "companyName",
    name: "Company",
    filterable: true,
    width: 250
  },
  {
    key: "status",
    name: "Status",
    filterable: true,
    width: 120
  },
  {
    key: "substatus",
    name: "Sub-Status",
    filterable: true,
    width: 140
  
  },
  {
    key: "last_engage",
    name: "Last Engage",
    filterable: true,
    width: 170
  },
  {
    key: "last_engage_type",
    name: "Last Engage Type",
    filterable: true,
    width: 170
  },
  {
    key: "countryName",
    name: "Country",
    filterable: true,
    width: COLUMN_WIDTH
  },
  {
    key: "audience",
    name: "Audience",
    filterable: true,
    width: COLUMN_WIDTH
 
  },
  
  {
    key: "batch",
    name: "Batch",
    filterable: true,
    width: 60
 
  },
  {
    key: "email",
    name: "Email",
    filterable: true,
    width: 250
  },
  {
    key: "last_comment",
    name: "Last Comment",
    filterable: true,
    width: 160
  
  }
].map(c => ({ ...c, ...defaultColumnProperties }));


const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}
const lastNameActions = [
  {
    icon: <a title="linkedin.com"><img className="linkedinpic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrCtHoLBV8UL-Ei-ugTBImr_Y83-JJ31jGJaGQ-cqoNTNP061"></img></a>,
    callback: () => {
      window.open("http://www.linkedin.com");
    }
  },
  {
    icon: <a title="more infomation"><img className="moreinfopic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPAqGb0QIt3yo3iMmJS3OP62R3kyI9y4-Ow7RBR_t2rNLDyjMK"></img></a>,
    callback: () => {
      window.open("");
    }

  }
];

function getCellActions(column) {
  const cellActions = {
    lastName: lastNameActions
  };
  return cellActions[column.key];
}


function TableCustomize({initialRows}) {
  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState({});
  const [modalIsOpenFlg, setModalOpen] = useState(false);
  const filteredRows = getRows(rows, filters);
  const changeModalStatus = (status) => {
    setModalOpen(status);
  }
    

  let i;
  for(i=0;i<columns.length;i++){

    if(columns[i].name==="Status" || columns[i].name==="Sub-Status"){ 
        columns[i].events = {onClick: function(ev) {changeModalStatus(true);}}
    }
  }
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        minHeight={1000}
        toolbar={<Toolbar enableFilter={true} />}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(initialRows, sortColumn, sortDirection))
        }
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})} 
        getCellActions={getCellActions}
      />
      <StatusModal modalIsOpen={modalIsOpenFlg} onClose={changeModalStatus}/>
    </div>
  );
}


const rootElement = document.getElementById("root");

ReactDOM.render(<TableCustomize initialRows={createRowData(100)}  />, rootElement);
  
import React, { useEffect, useState } from "react";
import ApplyForTrademark from "./ApplyForTrademark.js";
import Filters from "./Filters";
import "./Home.css";
import TrademarkCard from "./TrademarkCard.js";

const Home = ({ searchTerm }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewType, setViewType] = useState("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trademarks, setTrademarks] = useState([]);
  const [ownersList, setOwnersList] = useState([]);
  const [attorneysList, setAttorneysList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [correspondentsList, setCorrespondentsList] = useState([]);
  const [count, setCount] = useState(0);

  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const [expanded, setExpanded] = useState({});
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCorrespondents, setSelectedCorrespondents] = useState([]);
  const [status, setStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchTrademarks = async (page, statusFilter) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://vit-tm-task.api.trademarkia.app/api/v3/us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            input_query: searchTerm,
            input_query_type: "",
            sort_by: "default",
            status: statusFilter ? [statusFilter] : [],
            exact_match: false,
            date_query: false,
            owners: selectedOwners,
            attorneys: selectedAttorneys,
            law_firms: selectedCorrespondents,
            mark_description_description: [],
            classes: selectedCategories,
            page: page,
            rows: rowsPerPage,
            sort_order: sortOrder,
            states: [],
            counties: [],
          }),
        }
      );
      const data = await res.json();
      setTrademarks(data.body.hits.hits || []);
      setOwnersList(data.body.aggregations.current_owners.buckets);
      setAttorneysList(data.body.aggregations.attorneys.buckets);
      setCategoriesList(data.body.aggregations.class_codes.buckets);
      setCorrespondentsList(data.body.aggregations.law_firms.buckets);
      setCount(data.body.hits.total.value);
      setTotalPages(Math.ceil(data.body.hits.total.value / rowsPerPage));
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      fetchTrademarks(page, status === "all" ? null : status);
    }
  }, [
    page,
    searchTerm,
    status,
    selectedOwners,
    selectedAttorneys,
    selectedCategories,
    selectedCorrespondents,
    sortOrder,
  ]);

// const handleNext = () => {
//     if (page < totalPages) {
//         setPage(page + 1);
//     }
// };

// const handlePrevious = () => {
//     if (page > 1) {
//         setPage(page - 1);
//     }
// };

// const handleFirstPage = () => {
//     setPage(1);
// };

// const handleLastPage = () => {
//     setPage(totalPages);
// };


const handlePageClick = (pageNum) => {
  setPage(pageNum);
};

const handleNext = () => {
  if (page < totalPages) {
    setPage(page + 1);
  }
};

const handlePrevious = () => {
  if (page > 1) {
    setPage(page - 1);
  }
};

// Render numbered pagination
// const renderPageNumbers = () => {
//   let pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(
//       <button
//         key={i}
//         onClick={() => handlePageClick(i)}
//         className={page === i ? 'active' : ''}
//       >
//         {i}
//       </button>
//     );
//   }


const renderPageNumbers = () => {
  const pageNumbers = [];
  
  // Show first 3 pages
  for (let i = 1; i <= 2; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => handlePageClick(i)}
        className={page === i ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  // Add dots if the current page is greater than 4
  if (page > 3) {
    pageNumbers.push(<span key="dots1">...</span>);
  }

  // Show current page if it's not already shown in the first 3 or last 3
  if (page > 3 && page < totalPages - 2) {
    pageNumbers.push(
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        className="active"
      >
        {page}
      </button>
    );
  }

  // Add dots if the current page is less than totalPages - 3
  if (page < totalPages - 2) {
    pageNumbers.push(<span key="dots2">...</span>);
  }

  // Show last 3 pages
  for (let i = totalPages - 1; i <= totalPages; i++) {
    if (i > 3) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={page === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
  }
  return pageNumbers;
};

const toggleExpand = (index) => {
    setExpanded(prev => ({
        ...prev,
        [index]: !prev[index]
    }));
};

  // console.log(trademarks);
  const toggleView = (type) => {
    setViewType(type);
  };

  const updateFilters = (newFilters) => {
    if (newFilters.selectedOwners) {
      setSelectedOwners(newFilters.selectedOwners);
    }
    if (newFilters.selectedAttorneys) {
      setSelectedAttorneys(newFilters.selectedAttorneys);
    }
    if (newFilters.selectedCategories) {
      setSelectedCategories(newFilters.selectedCategories);
    }
    if (newFilters.selectedCorrespondents) {
      setSelectedCorrespondents(newFilters.selectedCorrespondents);
    }
    if (newFilters.status) {
      setStatus(newFilters.status);
    }
    setPage(1); // Reset to first page when filters change
  };

  

  return (
    <main className="home">
      <div className="top-bar">
        <h1>
          About {count} Trademarks found for "{searchTerm}"
        </h1>
        <button
          className="filters-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          🔍 Filters
        </button>
      </div>
      <div className="content-wrapper">
        <div className={`trademark-list ${viewType}-view`}>
          {trademarks?.map(
            (trademark, index) => (
              console.log(trademark),
              (
                <TrademarkCard
                  mark={trademark._source.mark_identification}
                  company={trademark._source.current_owner}
                  owners={trademark._source.current_owner}
                  number={trademark._source.registration_number}
                  date={new Date(
                    trademark._source.filing_date * 1000
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  status={trademark._source.status_type}
                  statusDate={new Date(
                    trademark._source.status_date * 1000
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  renewalDate={new Date(
                    trademark._source.registration_date * 1000
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  className={trademark._source.mark_description_description}
                  classCode={trademark._source.class_codes}
                  classIcon={trademark.classIcon}
                  historyDate={trademark.historyDate}
                  viewType={viewType}
                />
              )
            )
          )}
        </div>
        <div className="sidebar">
          {showFilters && (
            <Filters
              onViewChange={toggleView}
              filterData={{
                ownersList,
                attorneysList,
                categoriesList,
                correspondentsList,
              }}
              currentFilters={{
                selectedOwners,
                selectedAttorneys,
                selectedCategories,
                selectedCorrespondents,
                status,
              }}
              onFilterChange={updateFilters}
            />
          )}
          <ApplyForTrademark />
        </div>
      </div>

      {/* <div className="pagination">
        <button onClick={handleFirstPage}>First</button>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleLastPage}>Last</button>
      </div> */}

<div className="pagination">
        <button onClick={() => handlePageClick(1)} disabled={page === 1}>
          First
        </button>
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        {renderPageNumbers()}
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
        <button onClick={() => handlePageClick(totalPages)} disabled={page === totalPages}>
          Last
        </button>
      </div>
    </main>
  );
};

export default Home;

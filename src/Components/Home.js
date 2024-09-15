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
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 5;
  const [expanded, setExpanded] = useState({});
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCorrespondents, setSelectedCorrespondents] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
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
    </main>
  );
};

export default Home;

import "../../styles/filterTabs.css";

const FILTERS = [
  { id: "weekly",  label: "Haftalık" },
  { id: "monthly", label: "Aylık"    },
  { id: "yearly",  label: "Yıllık"   },
];

const FilterTabs = ({ active, onChange }) => {
  return (
    <div className="filter-tabs">
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          className={`filter-tab ${active === id ? "filter-tab--active" : ""}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;